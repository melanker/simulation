<?php
namespace App\DB;

use \App;
/**
 * Class sql_handler, wraps the sql creation logic.
 */
class sql_handler {

    public function getAll() {
        global $db_obj;
        $query = "SELECT * FROM simulation";
        $result = $db_obj->execute($query);

        if ($result) {
            $arr = array();
            foreach($result as $row) {
                $arr[] = array('uid' => $row['uid'], 'id' => $row['id'], 'name' => $row['name'], 'salary' => $row['salary'],
                    'created' => $row['created'],  'car' => $row['car'], 'hat' => $row['hat']);
            }
            echo json_encode($arr);
        }
        else throw new \Exception("Post Loading Error");
    }

    /**function replaceField($key,$replacement) for row deletion based on UID */
    public function deleteRow($key) {
        global $db_obj;

        $query = "DELETE FROM simulation WHERE UID='$key'";
        if ($db_obj->execute($query));
        else throw new \Exception("POST DELETE HAS FAILED");
    }

    /** insertTable(string) insert content of post into db posts*/
    public function insertTable($data) {
        global $db_obj;
        $id = $this->returnIfExist($data['ID']);
        $name = $this->returnIfExist($data['name']);
        $salary = $this->returnIfExist($data['salary']);
        $car = $this->returnIfExist(($data['car']));
        $hat = $this->returnIfExist($data['hatColor']);

        if (isset($id) && isset($name) && !isset($salary))
            $query = "INSERT INTO  simulation (id, name) VALUES ('$id' ,'$name')";
        else if (isset($id) && isset($name) && isset($salary) && isset($hat) && !isset($car))
            $query = "INSERT INTO  simulation (id, name, salary, hat) VALUES ('$id', '$name', '$salary','$hat')";
        else if (isset($id) && isset($name) && isset($salary) && isset($hat) && isset($car))
            $query = "INSERT INTO  simulation (id, name, salary, hat, car) VALUES ('$id', '$name', '$salary', '$hat','$car')";

        if ($db_obj ->execute($query))
            echo 'inserted successfully';
    }


    /**function replaceField($key,$replacement) for field replacment based on UID */
    public function replaceField($key, $data) {
        global $db_obj;
        $id = $this->returnIfExist($data['ID']);
        $name = $this->returnIfExist($data['name']);
        $salary = $this->returnIfExist($data['salary']);
        $car = $this->returnIfExist(($data['car']));
        $hat = $this->returnIfExist($data['hatColor']);

        if (isset($id) && isset($name) && !isset($salary))
            $query = "UPDATE simulation SET id='$id', name='$name' WHERE uid='$key'";
        else if (isset($id) && isset($name) && isset($salary) && isset($hat) && !isset($car))
            $query = "UPDATE simulation SET id='$id', name='$name', salary='$salary', hat='$hat' WHERE uid='$key'";
        else if (isset($id) && isset($name) && isset($salary) && isset($hat) && isset($car))
            $query = "UPDATE simulation SET id='$id', name='$name', salary='$salary', hat='$hat', car='$car' WHERE uid='$key'";

        if ($db_obj->execute($query));
        else throw new \Exception("POST EDIT HAS FAILED");
    }

    private function returnIfExist($val) {
        if (isset($val))
            return $val;
        else
            return NULL;
    }
}