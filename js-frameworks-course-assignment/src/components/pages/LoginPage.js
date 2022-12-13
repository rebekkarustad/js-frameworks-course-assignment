import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import Heading from "../Layout/Heading"
import FormError from "../forms/FormError"
import { LOGIN_URL, TOKEN_PATH } from "../../constants/api";

const url = LOGIN_URL + TOKEN_PATH;

const schema = yup.object().shape({
	username: yup.string().required("Please enter your username"),
	password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const history = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});

	async function onSubmit(data) {
		setSubmitting(true);
		setLoginError(null);

		console.log(data);

		try {
			const response = await axios.post(url, data);
			console.log("response", response.data);

			history("/admin");
		} catch (error) {
			console.log("error", error);
			setLoginError("Your password or username is wrong");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<div className="loginWrapper">
			<Heading title="Login" />
	  		<form onSubmit={handleSubmit(onSubmit)}>
				{loginError && <FormError>{loginError}</FormError>}
					<div className="loginInfo">
						{errors.username && <FormError>{errors.username.message}</FormError>}
						<label className="text-muted">Username</label>
						<input {...register("username")} />
					</div>
					<div className="loginInfo">
						{errors.password && <FormError>{errors.password.message}</FormError>}
						<label className="text-muted">Password</label>
						<input type="password" {...register("password")} />
					</div>

					<button>{submitting ? "Loggin in..." : "Login"}</button>
			</form>
    	</div>
	
	);
}