import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import getRandomSelect from '../utils/getRandomSelect';

import brand from '../assets/brand.png';
import overlayImage from '../assets/overlay.png';

import videos from '../data/videos.json';

const navlist = ['work', 'about', 'contact'];

type PlayerProps = {
  videoID: string;
};

const Player: React.FC<PlayerProps> = ({ videoID }) => {
  if (!videoID) {
    return (null);
  }

  return (
    <div>
      <iframe
        title="background-player"
        src={`https://player.vimeo.com/video/${videoID}?background=1&autoplay=1&loop=1&byline=0&title=0`}
        allow="autoplay; fullscreen"
      />
    </div>
  );
};

const Home: React.FC = () => {
  const [video, setVideo] = useState<string>('');

  const onChangeVideo = () => setVideo(
    getRandomSelect<number>(videos)
      .toString(),
  );

  useEffect(onChangeVideo, []);

  setInterval(
    onChangeVideo,
    10000,
  );

  return (
    <Page>
      <Header>
        <Player
          videoID={video}
        />
        <Content>
          <Overlay
            src={overlayImage}
          >
            <Message>
              안녕하세요. 그래픽 아티스트 TYPE입니다.
            </Message>
          </Overlay>
          <Navbar>
            <Brand
              src={brand}
            />
            <NavList>
              {navlist.map((nav, idx) => (
                <NavItem
                  key={`nav-${idx}`}
                >
                  {nav}
                </NavItem>
              ))}
            </NavList>
          </Navbar>
        </Content>
      </Header>
    </Page>
  );
};

export default Home;

const Page = styled.div`
`;

const Header = styled.header`
  position: relative;
  height: 100vh;

  iframe {
    object-fit: cover;
    box-sizing: border-box;
    height: 56.25vw;
    left: 50%;
    min-height: 100%;
    min-width: 100%;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    width: 177.77777778vh;
  }
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

type OverlayProps = {
  src: string;
};

const Overlay = styled.div<OverlayProps>`
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ src }) => src && css`
    background-image: url(${overlayImage});
  `}
`;

const Message = styled.span`
  font-size: 1.5rem;
  color: white;
  font-weight: 500;
  letter-spacing: 0.55px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Navbar = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 25px;
`;

const Brand = styled.img`
  height: 12px;
`;

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
`;
