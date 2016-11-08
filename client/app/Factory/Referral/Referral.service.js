'use strict';

angular.module('webApp')
	.factory('Referral', function ($q, $http) {
		var getRC = function() {
			var defer = $q.defer();
			$http.get('/api/referrals/rc')
			.then(function(result) {
				// console.log(result.data);
				defer.resolve(result.data);
			}, function(err) {
				defer.reject(err);
			});
			return defer.promise;
		};
		var getReferralResult = function() {
			var defer = $q.defer();
			$http.get('/api/referrals/result')
			.then(function(result) {
				var data = result.data;
				data.registered_coll = _.map(data.registered_coll, function(friend_obj) {
					if(_.contains(data.customer_list, friend_obj.customer_id)) {
						friend_obj.success = true;
					} else {
						friend_obj.success = false;
					}
					return friend_obj;
				});
				defer.resolve(data);
			}, function(err) {
				defer.reject(err);
			});
			return defer.promise;
		};
		var sendInviteMail = function(invite_name, invite_email, rc_url) {
			var defer = $q.defer();
			if(!invite_name || !invite_email || !rc_url) {
				defer.reject('no invitation data');
			} else {
				// Check if email is new or old, send mail for the same address once a day maximal.
				$http.post('/api/referrals/referral_list/', {name: invite_name, email: invite_email})
				.then(function(result) {
					$http.post('/api/mandrills/invite/', {name: invite_name, email: invite_email, rc_url: rc_url})
						.then(function(result) {
							defer.resolve(result);
						}, function(err) {
							defer.reject(err);
						});
				}, function(err) {
					defer.reject(err);
				});
			}
			return defer.promise;			
		};
		// Public API here
		return {
			getRC: getRC,
			getReferralResult: getReferralResult,
			sendInviteMail: sendInviteMail
		};
	});
