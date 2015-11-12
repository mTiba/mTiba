<?php

/**
 * Auth
 *
 * Authentication controller
 *
 * @package		CodeIgniter
 * @subpackage	Rest Server
 * @category	Controller
 * @author		Ifeoluwa Walter
 */
require (APPPATH . '/libraries/REST_Controller.php');
class Auth extends REST_Controller
{

    public function __construct() {
        parent::__construct ();
        $this->load->model ( array (
            'user_model'
        ) );
        $this->load->helper ( 'security' );
    }

    /**
     * Code sippet from ellislab forum;
     * To remap urls to the appropriate method
     *
     * @link http://ellislab.com/forums/viewreply/667070/
     * @see REST_Controller::_remap()
     */
    function _remap($method) {
        $param_offset = 2;

        // Default to index
        if (! method_exists ( $this, $method )) {
            // We need one more param
            $param_offset = 1;
            $method = 'index_' . $this->request->method;
        }

        // Since all we get is $method, load up everything else in the URI
        $params = array_slice ( $this->uri->rsegment_array (), $param_offset );

        // Call the determined method with all params
        call_user_func_array ( array (
            $this,
            $method
        ), $params );
    }


	/**
	 *
	 * Process authentication parameters
	 * @return Rest_Controller::response
	 */
	public function index_post()
	{

		$jsonData = (array)$this->post();

		$username = $jsonData['username'];
		$password = $jsonData['password'];

		if ($this->user_model->user_login($username,$password) == true)
		{
			$response = array('token'=>$this->user_model->update_token($this->user_model->get_user_id($username)));
			$this->response($response,200);
		}
		else
		{
			$this->response('',401);
		}
	}

    /**
     * @params json
     */
	public function index_delete()
	{
		$jsonData = (array)$this->delete();
		$token = $jsonData['token'];

	}


	/**
	 *
	 * not implemented
	 */
	public function auth_get()
	{
		$this->response('',402);
	}

	
	public function auth_post()
	{
		//check if the provided token is still active
		$jsonData = (array)$this->post();
		$result = $this->user_model->verifyToken($this->input->get_request_header ( 'Token', TRUE ));
		if ($result == true)
		{
			response('', 200);
		}
		else
		{
			response('', 401);
		}
		
	}

}
