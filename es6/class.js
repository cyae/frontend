class User {

    constructor(id, email, name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }

    login() {
        console.log(this.name, 'logged in,');
        return this;
    }

    logout() {
        console.log(this.name, 'logged out.');
        return this;
    }

}

var user1 = new User(1, 'qqq@qq.com', 'jack');
var user2 = new User(2, 'qqq@qq.com', 'jack');
user1.login().logout();

class Admin extends User {

    deleteUser(user) {
        users = users.filter(u => u.id != user.id);
    }

}

var admin = new Admin(999, 'xxx@qq.com', 'rose');
var users = [user1, user2];

console.log('before delete', users);

admin.deleteUser(user2);

console.log('after delete', users);
