
var URL_CONST = 'php/main.php';

$(document).ready(function(){
    var communication = new APP.Communication();
    var controller = new APP.Controller();
    communication.get();

    $('#submit_btn').on('click', function(){
        controller.formHandler('submit');
       // communication.dispatch(URL_CONST, 'POST', toSend);
    });

    $('#edit_btn').on('click', function(){
        controller.formHandler('edit');
        // communication.dispatch(URL_CONST, 'POST', toSend);
    });



    //var person = new APP.Person('Aria Stark', 2223);
    //var person = new APP.Teacher('Aria Stark','223232','15000','Red');
    //var person = new APP.Manager('Aria Stark','223232','15000','Red','Ford');
   // document.write(person.getDetails());


/*  (NICE EXAMPLE FOR PRIVATE)
    person.setPriv(34);
    alert(person.getPriv());
    person.setPriv(32);
    alert(person.getPriv());

    */

});

var APP = {};

APP.Person = function(name, ID) {
//    var _private;   //private var
//
//    this.setPriv = function (x){
//        _private = x; //setting private var
//    };
//
//    this.getPriv = function (){
//        return _private;
//    };

    this.name = name;
    this.ID = ID;
};
APP.Person.prototype.getDetails = function() {
    return " name: " + this.name + " ID: " + this.ID;
};


APP.Teacher = function(name, ID, salary, hatColor) {
    APP.Person.call(this, name, ID);
    this.salary = salary;
    this.hatColor = hatColor;
};
APP.Teacher.prototype = new APP.Person();

APP.Teacher.prototype.getDetails = function() {
    return APP.Person.prototype.getDetails.call(this) + " Salary: " + this.salary + " Hat: " + this.hatColor;
};


APP.Manager = function(name, ID, salary, hatColor, car) {
    APP.Teacher.call(this, name, ID, salary, hatColor);
    this.car = car;
};
APP.Manager.prototype = new APP.Teacher();

APP.Manager.prototype.getDetails = function() {
    return APP.Teacher.prototype.getDetails.call(this) + " Car: " + this.car;
};

