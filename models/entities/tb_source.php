<?php

class tb_source {
    private $source_id = 0;
    private $source_name = "";
    private $source_path = "";


    public function __construct($data = array()) {
        if ($data) {
            foreach ($data as $k => $v) {
                $setterName = 'set' . ucfirst($k);
                if (method_exists($this, $setterName)) {
                    $this->$setterName($v);
                }
            }
        }
    }
    
    public function getSourceId() {
        return $this->source_id;
    }
    
    public function getSourceName() {
        return $this->source_name;
    }
    
    public function getSourcePath() {
        return $this->source_path;
    }
    
    public function setSourceName($source_name) {
        $this->source_name = $source_name;
    }
    
    public function setSourcePath($source_path) {
        $this->source_path = $source_path;
    }
    
    public static function getNameFromSource() {
        $sql = 'SELECT source_name FROM tb_source;';
        $query = DB::getDB()->prepare($sql);
        $query->execute(array($source_name));
        $query->setFetchMode(PDO::FETCH_CLASS, 'tb_source');
        $query->fetch();
    }
    
    
}
    
    