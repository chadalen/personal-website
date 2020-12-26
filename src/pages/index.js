import React from 'react';
import Layout from '../components/layout';
import Card from '@material-ui/core/Card';
import { Typography, CardContent, CardActionArea } from '@material-ui/core';
import { graphql } from 'gatsby';

function Intro(props) {
  const { data } = props;
  return (
    <section
      id="intro"
      className="w-full h-screen flex justify-center items-center"
    >
      <div className="flex justify-center items-center flex-col">
        <img
          src={data.avatar.childImageSharp.resize.src}
          alt="Avatar"
          className="mb-4"
          style={{ maxWidth: '384px' }}
        />
        <div className="whitespace-pre text-3xl">
          Hello, I'm <span className="text-pink-600">Chad Adams</span>.
        </div>
        <div className="whitespace-pre text-3xl">
          I'm a Full-Stack Developer.
        </div>
      </div>
    </section>
  );
}

function AboutMe(props) {
  const { data } = props;
  return (
    <section id="about" className="w-full h-screen">
      <h1 className="text-4xl text-center mb-4">About Me</h1>

      <Card className="mb-4">
        <CardContent>
          <Typography>
            My name is Chad Adams. I'm a Full-Stack Developer from Mandan, North
            Dakota. I develop all types of software, but I primarily work with
            websites and mobile apps. Coding is my passion. I enjoy writing
            software that helps makes our lives easier. I first started to code
            around 12 years old when a friend of mine introduced me to RuneScape
            private servers.
          </Typography>
          <br />

          <Typography>
            I have an associates degree in Computer Programming from St Cloud
            Technical and Community College. I am currently pursuing a bachelors
            in Information Systems from Arizona State University.
          </Typography>
          <br />

          <Typography>
            I’m a big advocate for open-source software. I love Linux, my
            favorite linux distrobution is Ubuntu. I love reading books, writing
            blogs, working on my startup business, spending time with family and
            learning new technologies.
          </Typography>
          <br />
        </CardContent>
      </Card>
      <Certifications data={data} />
    </section>
  );
}

function Certifications(props) {
  const { data } = props;

  const onClickCertification = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <h1 className="text-4xl text-center mb-4">Certifications</h1>

      <div className="flex items-center justify-center">
        <Card
          className="inline-block mr-2"
          onClick={() =>
            onClickCertification(
              'https://www.microsoft.com/en-us/learning/exam-98-361.aspx'
            )
          }
        >
          <CardActionArea>
            <CardContent>
              <div className="flex items-center justify-center">
                <img
                  src={data.mta1.childImageSharp.resize.src}
                  alt="mta-badge-1"
                  style={{ maxWidth: '192px', maxHeight: '192px' }}
                />
              </div>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card
          className="inline-block"
          onClick={() =>
            onClickCertification(
              'https://www.microsoft.com/en-us/learning/exam-98-388.aspx'
            )
          }
        >
          <CardActionArea>
            <CardContent>
              <div className="flex items-center justify-center">
                <img
                  src={data.mta2.childImageSharp.resize.src}
                  alt="mta-badge-2"
                  style={{ maxWidth: '192px', maxHeight: '192px' }}
                />
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
}

export default ({ data }) => {
  return (
    <Layout>
      <Intro data={data} />
      <AboutMe data={data} />
    </Layout>
  );
};

export const query = graphql`
  query MyQuery($avatarWidth: Int = 384, $mtaWidth: Int = 192) {
    avatar: file(relativePath: { eq: "data/images/avatar-circle.png" }) {
      ...avatarFragment
    }
    mta1: file(relativePath: { eq: "data/images/mta-badge-1.png" }) {
      ...mtaFragment
    }
    mta2: file(relativePath: { eq: "data/images/mta-badge-2.png" }) {
      ...mtaFragment
    }
  }

  fragment avatarFragment on File {
    childImageSharp {
      resize(width: $avatarWidth, toFormat: WEBP, quality: 75) {
        src
      }
    }
  }

  fragment mtaFragment on File {
    childImageSharp {
      resize(width: $mtaWidth, toFormat: WEBP, quality: 75) {
        src
      }
    }
  }
`;
