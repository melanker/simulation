<?php
namespace App\DB;

class db_handler {

    private $host;
    private $user;
    private $password;
    private $dbname;
    private $con;

    /** Constructor sets the object of DB_MySQL*/
    public function __construct($host,$user,$password,$dbname) {
        $this->host = $host;
        $this->user = $user;
        $this->password = $password;
        $this->dbname = $dbname;
    }

    /**connect() provide connection to DB*/
    protected function connect() {
        $this->con =  mysqli_connect($this->host, $this->user, $this->password, $this->dbname);

        if (mysqli_connect_errno($this->con))
        {
            throw new Exception("mysqli connection problem to DB");
        }
    }

    /**execute($statement) connect and insert/delete etc.. a record to/from DB*/
    public function execute($query) {
        //connection to DB first
        $this -> connect();
        $resp = mysqli_query($this->con, $query);

        if (!$resp) {
            throw new Exception("Query FAILED!!!!");
            mysqli_close($this->con);
        }
        else {
            mysqli_close($this->con);
            return $resp;
        }
    }
}