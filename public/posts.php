<?php

$posts = array();
$start = intval($_GET['start']);
sleep(1);
for ($i = $start; $i < (10 + $start); ++$i) {
    array_push($posts,
            ["id" => $i,
             "title" => "POST ".$i,
             "description" => "description ".$i
        ]);
}

//http_response_code(404);
header('Content-Type: application/json; charset=utf-8');
echo $posts;