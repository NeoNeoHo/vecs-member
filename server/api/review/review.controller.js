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
import db_config from '../../config/db_config.js';
// import auth from '../../auth/auth.service.js';
var auth = require('../../auth/auth.service');
var mysql_pool = db_config.mysql_pool;
var mysql_config = db_config.mysql_config;

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
}

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
}

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

export function getReview(req, res) {
	var order_id = req.params.order_id;
	var token = auth.signToken(4504, 'mail');
	res.redirect('/order/review?order_id=' + order_id + '&vecs_token=' + token);
};

export function addReview(req, res) {
	console.log(req.body);
	var order_id = req.body.order_id;
	var products = req.body.products;
	var author = req.user.firstname;
	var customer_id = req.user._id;
	var insert_coll = _.reduce(products, function(insert_coll, product) {
		if(product.review && product.rate_pts) {
			insert_coll.push({
				order_id: order_id, 
				product_id: product.product_id, 
				customer_id: customer_id,
				author: author,
				text: mysql_pool.escape(product.review),
				rating: product.rate_pts,
				status: 0,
				date_added: new Date(),
				date_modified: new Date()
			});
		}
		return insert_coll;
	}, []);
	console.log(insert_coll);
	var sql = insertBulkSql('oc_review', insert_coll);
	mysql_pool.getConnection(function(err, connection) {
		if(err) {
			connection.release();
			res.status(400).json(err);
		}
		connection.query(sql, function(err, result) {
			connection.release();
			if(err) {
				res.status(400).json(err);
			}
			res.status(200).json(result);
		});
	});
};

