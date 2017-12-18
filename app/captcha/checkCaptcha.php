    <?php
    header('Access-Control-Allow-Origin: *'); 
    session_start();

    if(isset($_REQUEST['code'])  && isset($_SESSION['captcha']))
    {
        $res = 0;
        if(strtolower($_REQUEST['code']) == strtolower($_SESSION['captcha']))
        {
            $res = 1;
        }

        echo $res;// submitted
        // echo (strtolower($_REQUEST['code']) == strtolower($_SESSION['captcha']));
    }
    else
    {
        echo 0; // no code
    }
    ?>
