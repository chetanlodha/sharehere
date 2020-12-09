<?php
session_start();
require_once '../conn.php';
if(isset($_GET['id']))
{
	$user_id = mysqli_real_escape_string($link, base64_decode($_GET['id']));
	$data = array(array());
	$data_user = array();
	$cmd = mysqli_query($link, "SELECT * FROM `users` WHERE id = '$user_id'");
    if (mysqli_num_rows($cmd) !=0 ) 
	{
        $row=mysqli_fetch_array($cmd);
        $data_user['date_of_birth']=$row['date_of_birth'];
		$data_user['email']=$row['email'];
		$data_user['name'] = $row['name'];
		$data_user['profile_picture'] = $row['profile_picture'];
	}
	else 
	{ 
        $data_user['status'] = 301;
        $data_user['error'] = 'Invalid User_id';
    }
	$data_post = array(array());
	$dir = scandir('post/');
	$query = "SELECT * FROM post WHERE user_id = '$user_id' ";
	if($result = mysqli_query($link, $query))
	{  
		$i = 0;
		while($row = $result->fetch_assoc()) {
			$data_post[$i]['user_id'] = $row['user_id'];
			$data_post[$i]['comments'] = $row['comments'];
			$data_post[$i]['content'] = $row['content'];
			$data_post[$i]['likes'] = $row['likes'];
			$data_post[$i]['last_updated'] = $row['last_updated'];
			$data_post[$i]['media'] = $row['media'];
			$data_post[$i]['post_id'] = $row['post_id'];
			$data_post[$i]['name'] = $data_user['name'];
			$data_post[$i]['profile_picture'] = $data_user['profile_picture'];
			$j = 0;
			$data_file = array();
			foreach ($dir as $value) 
			{
				if(strpos($value , $data_post[$i]['post_id']) === 0)
				{
				   $data_file[$j++] = $value; 	
				}
			}
			$data_post[$i]['media'] = $data_file;
			
			$i++;
		}
		}	
	else  
	{  
		$data['status'] = $result;
		$data['error'] = $link -> error;
		echo json_encode($data);
	}
	$data[0]['profile_data'] = $data_user;
    $data[0]['post'] = $data_post;		
    echo json_encode($data);
}
else
{
	header('Location: http://index.php');
}	
?>