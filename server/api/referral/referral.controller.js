/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/locations              ->  index
 * POST    /api/locations              ->  create
 * GET     /api/locations/:id          ->  show
 * PUT     /api/locations/:id          ->  update
 * DELETE  /api/locations/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import q from 'q';
import db_config from '../../config/db_config.js';
// import auth from '../../auth/auth.service.js';
var auth = require('../../auth/auth.service');
var mysql_pool = db_config.mysql_pool;
var mysql_config = db_config.mysql_config;
var REFERRAL_SUCCESS_ORDER_STATUS_IDS = [20, 29, 54, 57, 60]; // ONLY CREDIT PAY IS COUNTED
var ConvertBase = function (num) {
	return {
		from : function (baseFrom) {
			return {
				to : function (baseTo) {
					return parseInt(num, baseFrom).toString(baseTo);
				}
			};
		}
	};
};
ConvertBase.hex2dec = function (num) {
    return ConvertBase(num).from(16).to(10);
};
ConvertBase.dec2hex = function (num) {
	return ConvertBase(num).from(10).to(16);
};

var updateDictSql = function(table, update_dict, condition_dict) {
	var set_string = '';
	var where_string = '';
	_.forEach(_.pairs(update_dict), function(pair) {
		if(set_string.length == 0) {
			set_string = pair[0] + ' = ' + mysql_pool.escape(pair[1]);
		}
		else {
			set_string = set_string + ', ' + pair[0] + ' = ' + mysql_pool.escape(pair[1]);
		}
	});
	_.forEach(_.pairs(condition_dict), function(pair) {
		if(where_string.length == 0) {
			where_string = pair[0] + ' = ' + pair[1];
		}
		else {
			where_string = where_string + ' and ' + pair[0] + ' = ' + pair[1];
		}
	});
	var sql_string = 'update ' + table + ' set ' + set_string + ' where ' + where_string;
	return sql_string;
};

var insertDictSql = function(table, insert_dict) {
	var set_string = '';
	_.forEach(_.pairs(insert_dict), function(pair) {
		if(set_string.length == 0) {
			set_string = pair[0] + ' = ' + mysql_pool.escape(pair[1]);
		}
		else {
			set_string = set_string + ', ' + pair[0] + ' = ' + mysql_pool.escape(pair[1]);
		}
	});
	var sql_string = 'insert into ' + table + ' set ' + set_string;
	return sql_string;
};

var updateBulkSql = function(table, update_coll, condition_coll) {
	var sqls = '';
	for(var i = 0; i < _.size(update_coll); i++) {
		var sub_sql = updateDictSql(table, update_coll[i], condition_coll[i]);
		if(sqls.length == 0) {
			sqls = sub_sql;
		} else {
			sqls = sqls + '; ' + sub_sql;
		}
	}
	return sqls;
};

var insertBulkSql = function(table, insert_coll) {
	var sqls = '';
	_.forEach(insert_coll, function(insert_dict) {
		var sub_sql = insertDictSql(table, insert_dict);
		if(sqls.length == 0) {
			sqls = sub_sql;
		} else {
			sqls = sqls + '; ' + sub_sql;
		}
	});
	return sqls;
};

// Return Object with two keys:
// 		registered_coll : array of referee objs [{...}, {...}, ...]
// 		customer_list : array of successful customer_id [ 1, 2, 3 ...]
var getReferralResult = function(referer_customer_id) {
	var defer = q.defer();
	var rc = ConvertBase.dec2hex(referer_customer_id);
	var res_result = {
		registered_coll: [],
		customer_list: []
	};
	mysql_pool.getConnection(function(err, connection) {
		if (err) {
			connection.release();
			defer.reject(err);
		}
		connection.query('select customer_id, email, firstname from oc_customer where referral_code = ?',[rc], function(err, result) {
			if (err) {
				connection.release();
				defer.reject(err);
			}
			res_result.registered_coll = result;
			if(result.length) {
				var customer_ids = _.pluck(result, 'customer_id');
				connection.query('select distinct(customer_id) from oc_order where customer_id in (?) and order_status_id in (?);', [customer_ids, REFERRAL_SUCCESS_ORDER_STATUS_IDS], function(err, customer_result) {
					connection.release();
					if(err) {
						defer.reject(err);
					}
					res_result.customer_list = _.pluck(customer_result, 'customer_id');
					defer.resolve(res_result);
				});
			} else {
				connection.release();
				defer.resolve(res_result);
			}
			
		});
	});
	return defer.promise;
};

// To Be Done, by Johny, not sure what to do it effectively
export function isMailInvitedToday(req, res) {
	var email = req.body.email || '';
	var name = req.body.name || '';
	var customer_id = req.user._id;
	var date = new Date();
	date.setDate(date.getDate() - 1);  // get yesterday
	var sql = 'select * from oc_referral_list where date_sent > ? and email = ?;';
	mysql_pool.getConnection(function(err, connection) {
		if(err) {
			connection.release();
			res.status(400).json(err);
		}
		connection.query(sql,[date, email], function(err, result) {
			if(err) {
				connection.release();
				console.log(err);
				res.status(400).json(err);
			}
			// The address has been sent today
			if(result[0]) {
				connection.release();
				res.status(400).send('already_sent');
			} else {
				var insert_dict = {
					customer_id: customer_id,
					email: email,
					name: name,
					date_sent: new Date()
				};
				// IF the address not be sent today, then add it to the table
				var sql = insertDictSql('oc_referral_list', insert_dict);
				connection.query(sql, function(err, result) {
					connection.release();
					if(err) {
						console.log(err);
						res.status(400).json(err);						
					} else {
						res.status(200).send('available_today');
					}
				});
			}
			
		});
	});	
}


export function getRC(req, res) {
	var customer_id = req.user._id;
	// var customer_id = '1';
	var rc = ConvertBase.dec2hex(customer_id);
	// var cr = ConvertBase.hex2dec(rc);
	console.log(rc);
	// console.log(cr);
	res.status(200).send(rc);
};

export function getReferralResult(req, res) {
	var referer_customer_id = req.user._id;
	getReferralResult(referer_customer_id).then(function(res_result) {
		res.status(200).json(res_result);
	}, function(err) {
		res.status(400).json(err);
	});
};