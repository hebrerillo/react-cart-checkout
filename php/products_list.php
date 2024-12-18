<?php

$list = array();

for ($i = 0; $i < 30; $i++) {
  $id = uniqid();
  array_push($list, ['id' => $id,
      'name' => 'renault',
      'img_url' => 'http://localhost/original.jpg?param='.$id
      ]);
}

header('Content-type: application/json');
echo json_encode($list);
