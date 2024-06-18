import Spline from '@splinetool/react-spline';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;

    .spline {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
    }
`;

const Content = styled.div`
    position: absolute;
    diplay: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 55vh;
    left: 10vw;
    width: 75%;
    padding: 20px;
    padding-left: 30px;
    border-radius: 30px;
    backdrop-filter: blur(10px);
    background-color: #00000050;
    
`;

const GetStarted = styled.h1`
    box-shadow: 0px 0px 10px 1px solid #595959;
    font-family: "Oswald", sans-serif;
    font-size: 25px;
`;

const Discover = styled.p`
    font-family: "Oswald", sans-serif;
    font-size: 20px;
`;

const HomeContent = styled.p`
    width: 85%;
    font-family: "Oswald", sans-serif;
`

const HomeBtn = styled.button`
    border: 0px;
    border-radius: 10px;
    width: 130px;
    height: 35px;
    box-shadow: rgba(var(--primary-color), 0.5) 0px 0px 20px 0px;
    font-family: "Oswald", sans-serif;
    
    border: 2px solid #59595950;
    backdrop-filter: blur(10px);
    background-color: #ffffff80;
    
`

const Student = () => {
  return (
    <Wrapper >
      <Spline 
        scene="https://prod.spline.design/9PmUq5sI97cYCImr/scene.splinecode" 
      />
      <Content>
        <GetStarted>Welcome to Bigbooster – Your Ultimate Learning Companion!</GetStarted>
        <Discover>Discover, Learn, Excel</Discover>
        <HomeContent>The all-in-one application designed exclusively for students like you! We understand the unique challenges you face in your academic journey and are here to make your study sessions more effective, efficient, and enjoyable.</HomeContent>
        <Link to="/student"><HomeBtn>Start</HomeBtn></Link>
      </Content>
      </Wrapper>
  );
}

export default Student;




