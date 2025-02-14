


// import { Slot, useRouter } from "expo-router";
// import {Text} from "react-native";
// import { useEffect } from "react";

// export default function WebLayout() {
//   const router = useRouter();


//   return (
//     <Text>Native</Text>
//   );
// }

import styled from "@emotion/styled";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRouter } from "expo-router";

const Container = styled.div`
  margin-left: -10;
  padiing-left: -10;
  display: flex;
  height: 100vh;
  background-color: #0fafaf;
`;

const LeftPane = styled.div`
  flex: 1;
  padding: 50px;
  color: #ffffff;
  position: relative;
  z-index:50;
  background:url('drivrperformbg.webp') no-repeat center;
`;

const Logo = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: #ffffff;
  position: absolute;
  z-index: 12;
  top: 1px;
  left: 1px;
`;

const Heading = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-top: 100px;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
`;

const BackgroundSvg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  z-index: 1;
`;
// background: url('drivrperformbg.webp') no-repeat center;
  // background-size: 100%;
const RightPane = styled.div`
  flex: 1;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 350px;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index:5;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  font-size: 16px;
  background-color: #f9f9f9;
  &:focus {
    border-color: #6a5acd;
    outline: none;
    box-shadow: 0 0 5px rgba(106, 90, 205, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: #ffffff;
  background-color: #0fafaf;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 15px;

  &:hover {
    background-color: #0f7b81;
  }
`;

const GitHubButton = styled(Button)`
  background-color: #24292e;
  margin-top: 10px;

  &:hover {
    background-color: #1e2328;
  }
`;

const Link = styled.a`
  color: #6a5acd;
  font-size: 14px;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {

  const [user, setUser] = useState("");
  const router = useRouter();
  //   const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const handleLogin = async (e: any) => {
    router.push("/AppHolder");
    e.preventDefault();
    try {
      const userObj = await axios.post(`${"http://52.183.132.161/backend"}/api/users/find`, {
        email: user,
        password,
      });
    //   navigate("/builder_dashboard");
      router.push("/AppHolder");
      sessionStorage.setItem("user", JSON.stringify(userObj));
    
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <LeftPane>
        <Logo>
          <img
            style={{ width: "120px", height: "120px" }}
            src="logo Final-03.png"
            alt="Act21"
          />{" "}
        </Logo>
       
        <Heading>Create business apps like assembling blocks</Heading>
        <Description>
          Powered by data visualization tools and flexible actions.
        </Description>
      </LeftPane>
      <RightPane>
      <BackgroundSvg />
        <LoginBox>
          <Title>Welcome back</Title>
          <Input
            onChange={(e) => setUser(e.target.value)}
            type="email"
            placeholder="Enter your email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
          />
          <Button onClick={handleLogin}>Sign in</Button>
          {/* <GitHubButton>Sign in with GitHub</GitHubButton> */}
          <Link href="#">New user? Create an account</Link>
        </LoginBox>
      </RightPane>
    </Container>
  );
};

export default Login;

  