<?php

/**
 *
 * Helper to create and manager hashes
 * I could have used built-in code-igniter encryption class,
 * but really, security can never be too tight.
 * @author iFewalter
 *
 */


if (!function_exists('create_hash'))
{
	function create_hash($string='')
	{
		$salt = bin2hex(mcrypt_create_iv(32, MCRYPT_DEV_URANDOM)); //get 256 random bits in hex
		$hash = hash("sha256", $salt . mysql_real_escape_string($string)); //prepend the salt, then hash
		//store the salt and hash in the same string, so only 1 DB column is needed
		$final = $salt . $hash;

		return $final;
	}
}

if (!function_exists('verify_hash'))
{
	function verify_hash($original='',$string='')
	{
		$salt = substr($original, 0, 64); //get the salt from the front of the hash
		$validHash = substr($original, 64, 64); //the SHA256

		$testHash = hash("sha256", $salt . $string); //hash the password being tested
		//if the hashes are exactly the same, the password is valid
		if($testHash === $validHash)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}

if (!function_exists('random_hash'))
{
	function random_hash($strength=20)
	{
		$a = null;
		for ($i =0; $i<$strength; $i++)
		{
			$a .= mt_rand(0,9);
		}

		return hash('sha512', $a);
	}
}

