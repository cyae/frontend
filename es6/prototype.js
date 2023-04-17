// simulate class using constructor function
function User(id, email, name) {

    this.id = id;
    this.email = email;
    this.name = name;

    // class function
    // this.login = function () {
    //     console.log(this.name, 'logged in.');
    //     return this;
    // }

    // this.logout = function () {
    //     console.log(this.name, 'logged out.');
    //     return this;
    // }
}

// create class function using prototype
User.prototype.login = function () {
    console.log(this.name, 'logged in.');
    return this;
};
User.prototype.logout = function () {
    console.log(this.name, 'logged out.');
    return this;
};

var user1 = new User(1, 'aaa@qq.com', 'jack');
var user2 = new User(2, 'aaa@qq.com', 'jack');
user1.login().logout();

// simulate inheritance using apply
function Admin(...args) {
    User.apply(this, args) // attributes inheritance: call the User constructor function on this(Admin) with args
}
// class function inheritance: using User prototype
Admin.prototype = Object.create(User.prototype)

Admin.prototype.deleteUser = function (user) {
    users = users.filter(u => u.id != user.id);
}

var admin = new Admin(999, 'vvvWqq.com', 'rose');
console.log(admin);

var users = [user1, user2];

console.log('before delete', users);
admin.deleteUser(user1);
console.log('after delete', users);
