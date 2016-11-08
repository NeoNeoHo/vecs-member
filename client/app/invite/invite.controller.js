'use strict';

angular.module('webApp')
	.controller('InviteController', function ($scope, Referral, $timeout) {
		$scope.isSendInviteMail = false;
		$scope.rc_login_url = 'vecsgardenia.com/login?rc=';
		$scope.isCollapsedLine = true;
		Referral.getRC().then(function(data) {
			$scope.referral_code = data;
			$scope.rc_url = $scope.rc_login_url + $scope.referral_code;
			$scope.mailto = 'mailto:?subject=與好姐妹一起加入嘉丹妮爾&body=沒有負擔的美麗－嘉丹妮爾，接受我的邀請加入會員，你的第一筆訂單可以享有85折，購物成功後還可再得200元紅利折抵喔！ ' + encodeURIComponent($scope.rc_url);
			$scope.lineto = '從我的連結買東西可以有一次85折：） 購物成功還可以讓我們一起獲得100~300元購物金喔' + $scope.rc_url;
			$scope.viaFacebook = {
				description: '從我的連結買東西可以有一次85折：） 購物成功還可以讓我們一起獲得100~300元購物金喔',
				caption: '嘉丹妮爾・好友分享!',
				text: '好友分享月',
				media: 'https://vecsgardenia.com/image/catalog/MEMBER/INVITE/FB_invite_5.jpg'
			};
			$scope.viaWhatsapp = {
				text: '沒有負擔的美麗－嘉丹妮爾，接受我的邀請加入會員，你的第一筆訂單可以折15%(滿千折15%)，購物成功後還可再得200元紅利折抵喔！'
			};
		}, function(err) {
			console.log(err);
		});
		Referral.getReferralResult().then(function(data) {
			$scope.registered_coll = data.registered_coll;
			$scope.num_friend_succeed = data.customer_list.length;
		}, function(err) {
			console.log(err);
		});
		$scope.sendInviteMail = function() {
			$scope.isSendInviteMail = true;
			Referral.sendInviteMail($scope.invite_name, $scope.invite_email, $scope.referral_code).then(function(data) {
				$scope.isSendInviteMail = false;
				$scope.invite_name = '';
				$scope.invite_email = '';
				$scope.invite_sent_msg = '已寄邀請信給'+$scope.invite_name+'囉';
				$timeout(function() {
					$scope.invite_sent_msg = '';
				}, 5000);
			}, function(err) {
				$scope.isSendInviteMail = false;
				if(err.data === 'already_sent') {
					$scope.invite_sent_msg = '今日已寄過邀請信給您的好友:' + $scope.invite_email + ' 囉，明天再提醒他吧 :)';
					$timeout(function() {
						$scope.invite_sent_msg = '';
					}, 5000);
				}
				$scope.invite_name = '';
				$scope.invite_email = '';
			})
		}
	});
