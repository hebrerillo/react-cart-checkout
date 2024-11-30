<?php

$list = array();

for ($i = 0; $i < 30; $i++) {
  $id = uniqid();
  array_push($list, ['id' => $id,
      'name' => 'renault',
      'img_url' => 'https://images.unsplash.com/photo-1721332153370-56d7cc352d63'
      ]);
}

header('Content-type: application/json');
echo json_encode($list);
