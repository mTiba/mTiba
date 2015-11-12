<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class UserModel extends CI_Model
{

	public function __construct()
	{
		$this->load->database();
		$this->load->helper(array('hash', 'date'));
	}


	protected function create_user($username, $password, $account_type)
	{
		$this->db->insert('users', array('username'=>$username, 'password'=>create_hash($password), 'account_type'=>$account_type));
		$id = $this->db->insert_id();
		return $id;
	}

	public function create_patient($username, $password, $fullname, $day_of_birth, $month_of_birth, $year_of_birth, $is_in_care, $current_doctor=null)
	{	

		$user_id = $this->create_user($username, $password, ACCOUNT_TYPE_PATIENT);

		$this->db->insert('patients_personal',array('fullname'=>$fullname, 'day_of_birth'=>$day_of_birth, 'month_of_birth'=>$month_of_birth,
			'year_of_birth'=>$year_of_birth, 'is_in_care'=>$is_in_care, 'current_doctor'=>$current_doctor));

	}

	public function create_doctors()
	{	

		$this->create_user($username, $password, ACCOUNT_TYPE_DOCTOR);
	}


	protected function match_doctor()
	{

		//TODO: select random doctor.
		//Later incorporate and algorithm that pick doctor based on certain metrics/critetria
		
		return 1;

	}
        
        public function user_login($username, $password)
        {
            $this->db->select(array('password,account_type,_id'));
            $result  = $this->db->get_where('users',array('username'=>$username));
            if ($result->num_rows() == 1)
            {
                if (verify_hash($result->row()->user_password, $password) == true)
                {
                    //TODO: return user details instead
                    return true;
                }
               
            }
            return false;
        }

        public function check_user_exists($username)
        {
            $this->db->select(array('_id'));
            $result = $this->db->get_where('users',array('username'=>$username));
            if ($result->num_rows() == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public function check_user_token($token, $md5_user_id)
        {

        	$this->db->select(array('user_id'));



        }
                

}








	

	public function get_user($id) {
		if ($id != null) {
			$result = $this->db->get_where ( 'utiset_user_profile', array (
					'user_id' => $id 
			) );
			if ($result->num_rows == 1) {
				return $result->row ();
			}
		}
		return false;
	}
	
	/*
	 * public function get_token($username) { $this->db->select('user_token'); $result = $this->db->get_where('utiset_user',array('user_email'=>$username)); return $result->row()->user_token; }
	 */
	public function get_id_from_token($token) {
		if ($this->verifyToken ( $token ) == true) {
			$this->db->select ( 'user_id' );
			$this->db->limit ( 1 );
			$result = $this->db->get_where ( 'utiset_user_token', array (
					'token' => $token 
			) );
			return $result->row ()->user_id;
		} else {
			return null;
		}
	}
	public function get_user_id($email) {
		$this->db->select ( '_id' );
		$result = $this->db->get_where ( 'utiset_user', array (
				'user_email' => $email 
		) );
		return $result->row ()->_id;
	}
	public function update_token($id) {
		// TODO: remove next line
		// $result = $this->db->update('utiset_user',array('user_token'=>random_hash()),array('_id'=>$id));
		$hash = random_hash ();
		$this->db->insert ( 'utiset_user_token', array (
				'user_id' => $id,
				'token' => $hash 
		) );
		return $hash;
	}
	public function verifyToken($token) {
		// TODO: filter input
		$this->db->select ( 'token' );
		$this->db->limit ( 1 );
		$result = $this->db->get_where ( 'utiset_user_token', array (
				'token' => $token 
		) );
		if ($result->num_rows () == 1) {
			if ($result->row ()->token === $token) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	public function checkUserExists($email) {
		$result = $this->db->get_where ( 'utiset_user', array (
				'user_email' => $email 
		) );
		if ($result->num_rows () == 1) {
			return true;
		} else {
			return false;
		}
	}
}

?>