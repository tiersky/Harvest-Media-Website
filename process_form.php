<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $full_name = htmlspecialchars(trim($_POST['full_name']));
    $email_address = filter_var(trim($_POST['email_address']), FILTER_SANITIZE_EMAIL);
    $mobile_number = htmlspecialchars(trim($_POST['mobile_number']));
    $email_subject = htmlspecialchars(trim($_POST['email_subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Check if required fields are not empty
    if (empty($full_name) || empty($email_address) || empty($mobile_number) || empty($email_subject) || empty($message)) {
        echo "Please complete all fields.";
        exit;
    }


    if (!filter_var($email_address, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address.";
        exit;
    }

    $to = "huseyin@harvest.ist";
    $subject = "New Contact Form Submission: $email_subject";
    $email_content = "You have received a new message from your website contact form.\n\n";
    $email_content .= "Full Name: $full_name\n";
    $email_content .= "Email Address: $email_address\n";
    $email_content .= "Mobile Number: $mobile_number\n";
    $email_content .= "Subject: $email_subject\n\n";
    $email_content .= "Message:\n$message\n";
    $headers = "From: $full_name <$email_address>";

 
    if (mail($to, $subject, $email_content, $headers)) {
       
        echo "Thank you! Your message has been sent.";

    } else {
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }
} else {
 
    echo "There was a problem with your submission. Please try again.";
}
?>
