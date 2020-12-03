<?php
session_start();
require_once '../conn.php';
$data = array();
if($_FILES['image'] || isset($_POST['content'])){
    $post_id = mysqli_real_escape_string($link, md5(uniqid()));
	$user_id = mysqli_real_escape_string($link, $_SESSION['sess_id']);
	date_default_timezone_set("Asia/Calcutta");
    $date_now = date("r");
	$date_created = $date_now;
	$last_updated = $date_now;
	$countfiles = count($_FILES['image']['name']);
	if($_FILES['image'])
	{
		$maxsize = 5242880;
		if((array_sum($_FILES['image']['size']) >= $maxsize) || ($_FILES["image"]["size"] == 0)) {
            $data['status'] = 601;
		    $data['error'] = "File too large. File must be less than 5MB.";
        }
		else{
			$path = getcwd(); 
			$file = array();
			for($i=0;$i<$countfiles;$i++){
				$img = $_FILES['image']['name'][$i-1];
				$tmp = $_FILES['image']['tmp_name'][$i-1];
				$ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
				$final_image = $post_id."_".$i.'.'.$ext;
				$file[$i] = $final_image;
				move_uploaded_file($tmp,"$path/post/$final_image"); 
			}
		}	
	}
	else
	{
	   $file = NULL;
	}
	if(isset($_POST['content']))
	{
	   $content = $_POST['content'];  
	}
	else
	{
	   $content =  NULL;
 	}
	$comments = 0;
	$likes = 0;
    date_default_timezone_set("Asia/Calcutta");
	$date_now = date("r");
	$last_updated = $date_now;
    $query = "INSERT INTO `post` (`post_id`, `user_id`, `media`,`content`,`date_created`,`last_updated`, `comments`, `likes`) VALUES ('$post_id', '$user_id', '$countfiles','$content','$date_created','$last_updated', '$comments','$likes')";
    if(!isset($data['status']))
	{
    	if($result = mysqli_query($link, $query))
    	{  
		    $data['likes'] = $likes;
			$data['comments'] = $comments;
			$data['media'] = $file;
	    	$data['last_updated'] = $last_updated;
			$data['content'] = $content;
			$data['status'] = 201;
     		echo json_encode($data);
	    }		
		else  
		{  
			$data['status'] = 601;
			$data['error'] = $link -> error;
			echo json_encode($data);
		}
	}
    else
	{
		echo json_encode($data);

	}	
    
}
else
{
	header('Location: http://index.php');
}
?>