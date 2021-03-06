var $ = require('jquery');
var Backbone = require('backbone');

var User = Backbone.Model.extend({
  auth: function(){
    var self = this;
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("Authorization", 'Token ' + self.get('token'));
      }
    });
  }
},{
  login: function(username, password, callback){
    var loginUrl = 'obtain_token/';
    $.post(loginUrl, {username: username, password: password}).then(function(result){

      var user = new User();
      user.set('token', result.token);
      user.auth();

      localStorage.setItem('user', JSON.stringify(user.toJSON()));

      callback(user);
    });
  }
});

module.exports = {
  User: User
};