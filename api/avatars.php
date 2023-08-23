<?php
$file = "{$_SERVER['DOCUMENT_ROOT']}/data/avatars_1.dat"; //1 indicates beatstar. 2 is for countrystar. How/if/when you want to implement this properly and remove the hardcode is up to you.
if (file_exists($file)) {
  $data = file_get_contents($file); 
  $Response = unserialize($data);
  http_response_code(200);
  header("Content-Type: application/json");
  echo json_encode($Response);
  exit();
}
else
{
  http_response_code(404);
  header("Content-Type: application/json");
  echo json_encode(array(
    "Code" => 400,
    "Message" => "Avatar data file not found."
  ));
  exit();
}
?>