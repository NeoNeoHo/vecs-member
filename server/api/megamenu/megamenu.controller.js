'use strict';

import _ from 'lodash';
import db_config from '../../config/db_config.js';
import api_config from '../../config/api_config.js';
import q from 'q';
import moment from 'moment';
import mandrill from 'mandrill-api/mandrill';
var Order = require('../order/order.controller.js');
var mandrill_client = new mandrill.Mandrill(api_config.MANDRILL_KEY);
var mysql_pool = db_config.mysql_pool;
var mysql_config = db_config.mysql_config;	

var sendOrderSuccess = function(order_id) {
	var defer = q.defer();
	Order.lgetOrder(order_id).then(function(order_info) {
		if(_.size(order_info) == 0) defer.reject('invalid order_id while processing sendOrderSuccess');
		var firstname = order_info[0].firstname;
		var email = order_info[0].email;
		var template_name = api_config.mandrill_template.order_success;
		var template_content = [{
			"name": "example name",
			"content": "example content"
		}];
		var to_coll = [{
			"email": email,
			"name": firstname,
			"type": "to"
		}];
		var merge_vars_coll = [{
			"rcpt": email,
			"vars": [
				{
					"name": "order_id",
					"content": order_id
				}
			]
		}];
		var message_info = {
			from_name: "嘉丹妮爾的出貨小組",
			from_email: "customer@vecsgardenia.com",
			subject: "您的訂單已成功"
		};
		var message = mandrill_message_template(message_info, to_coll, merge_vars_coll, "md_order_success", ['order_success']);
		var async = false;
		mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async}, function(result) {
			console.log(result);
			defer.resolve(result);
		}, function(e) {
			// Mandrill returns the error as an object with name and message keys
			console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
			defer.reject(e);
			// A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
		});
	}, function(err) {
		console.log(err);
		defer.reject('invalid order_id while processing sendOrderSuccess');
	});
	return defer.promise;
};

exports.sendOrderSuccessHttpPost = function(req, res){
	console.log('######## sendOrderSucessHttpPost');
	var order_id = req.body.order_id;
	if(!order_id) res.status(400).send('Error on sendOrderSuccess: no order_id');
	sendOrderSuccess(order_id).then(function(result) {
		res.status(200).json(result);
	}, function(err) {
		res.status(400).json(err);
	});
};

var getChilds = function(id=null, store_id=0 ){
	$sql = ' SELECT m.*, md.title,md.description FROM ' . DB_PREFIX . 'megamenu m LEFT JOIN '
							.DB_PREFIX.'megamenu_description md ON m.megamenu_id=md.megamenu_id AND language_id='.(int)$this->config->get('config_language_id') ;
	$sql .= ' WHERE m.`published`=1 ';
			$sql .= ' AND store_id=' + store_id;
	if( $id != null ) {						
		$sql .= ' AND parent_id=' + id;						
	}
	$sql .= ' ORDER BY `position`  ';
	mysql_pool.getConnection(function(err, connection){
		if(err) handleError(res, err);
		connection.query(sql, function(err, rows) {
			if(err) handleError(res, err);
			connection.release();

		});
	});					
	return $query->rows;
};
