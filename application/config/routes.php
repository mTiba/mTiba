<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/

function whichSubRoute()
{
    $subs = array(
                "api"=>"api/",
                "m"=>"m/"
                );

    $curr = $_SERVER['HTTP_HOST'];
    $curr = explode('.', $curr);
    if(array_key_exists($curr[0], $subs))
    {
        return array($curr[0], $subs[$curr[0]]);
    }
    return false;
}


//due to the the way this setup works, some controller references
//can be found multiple times (and in no particular order).
//also note due to this setup, each method has its own default and 404
$choiceRoute = whichSubRoute();
if($choiceRoute !== false)
{
    if($choiceRoute[0]=="api")
    {
        $route['default_controller'] = "welcome";
        $route['404_override'] = '';
        //start version 1 (mvp API)
        $route['1.0/user/(:any)'] = $choiceRoute[1].'v1_userinfo/index/$1';
        //controllers outside of "/api"
        $route['translate_uri_dashes'] = FALSE;
        
    }
    if($choiceRoute[0]=="m")
    {
        $route['default_controller'] = "welcome";
        $route['404_override'] = '';
        //start version 1 (mobile)
        $route['welcome']                   = $choiceRoute[1].'m_welcome';
        $route['dashboard']                 = $choiceRoute[1].'m_dashboard';
        $route['user/(:any)']               = $choiceRoute[1].'m_userinfo/index/$1';
        $route['reg']                       = 
        //controllers outside of "/m"
        $route['login/auth']                = 'login/auth';
        $route['logout/mobile']             = 'logout/mobile';
        //end version 1 (mobile)
        $route['translate_uri_dashes'] = FALSE;
    }
}
else
{
    $route['default_controller'] = "welcome";
    $route['404_override'] = '';
}
/* End of file routes.php */
/* Location: ./application/config/routes.php */

