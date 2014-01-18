APP.Communication = function() {


    function dispatch(url, requestMethod, data) {
        $.ajax({
            type: requestMethod,
            url: url,
            data: {
                json: data
            },
            success: responseHandler
        });
    }


    this.get = function () {
        dispatch(URL_CONST, 'GET');
    };

    this.post = function (data) {
        dispatch(URL_CONST, 'POST', data);
    };

    this.put = function (data) {
        dispatch(URL_CONST, 'POST', data);
    };

    function responseHandler(response) {
        var controller = new APP.Controller();
        response = $.parseJSON(response);
        controller.toTable(response);
    }
};

APP.Controller = function() {

    this.formHandler = function(action) {
        var communication = new APP.Communication();
        var object;
        if ($('#person_occuption').val() == 'person') {
            object = new APP.Person($('#person_name').val(), $('#person_id').val());
        } else if ($('#person_occuption').val() == 'teacher') { //person_salary
            object = new APP.Teacher($('#person_name').val(), $('#person_id').val(), $('#person_salary').val(), 'Green');
        } else if ($('#person_occuption').val() == 'manager') {
            object = new APP.Manager($('#person_name').val(), $('#person_id').val(), $('#person_salary').val(), 'Green', $('#person_car').val());
        }
        if (action == 'submit')
            communication.post(toJson(object));
        if (action == 'edit') {
            object.uid =  $('#uid_input').val();
            communication.put(toJson(object));
        }
    };

    function toJson(object) {
        var jsonArr = [];

        jsonArr = JSON.stringify(object);
        alert(jsonArr);

        //teacher and manager
        if (object instanceof APP.Teacher|| object instanceof APP.Manager) {
            jsonArr[0].salary = object.salary;
            jsonArr[0].hat = object.hatColor;
        }

        //manager
        if (object instanceof APP.Manager) {
            jsonArr[0].car = object.car;
        }



        return jsonArr;
    }

    this.toTable = function(response) {
        $.each(response, function(i, item)
        {
            var row = $('<ul>').attr('id', item.uid);
            // var button = jQuery('<button>').text('X');
            // button.attr('id',item.id);

            //check odd or even row.
            if (!(i%2 == 0))
                row.attr('class', 'odd');
            else
                row.attr('class', 'even');

            row.append(
                $('<li>').text((item.id) ? item.id : '').attr('class','id'),
                $('<li>').text((item.created) ? item.created : '').attr('class','created'),
                $('<li>').text((item.name) ? item.name : '').attr('class','name'),
                $('<li>').text((item.car) ? item.car : '').attr('class','car'),
                $('<li>').text((item.hat) ? item.hat : '').attr('class','hat')
            ).appendTo('.table');
        });
        setSelected();
    };

    function setSelected() {
        //Sets a click listener after rendering the element
        $('ul').on('click', function() {
            $('ul.selected').removeClass('selected');
            $(this).addClass("selected");

            $('#person_name').val($(this).find('li.name').text());
            $('#person_id').val($(this).find('li.id').text());
            $('#person_salary').val($(this).find('li.salary').text());
            $('#person_car').val($(this).find('li.car').text());
            $('#uid_input').val($(this).attr('id'));
        });
    }


};

