import React from 'react';
import Card from '../components/Card';
import Layout from '../components/layout';

function Intro() {
  return (
    <section
      id="intro"
      className="w-full h-screen flex justify-center items-center"
    >
      <div className="flex justify-center items-center flex-col">
        <img
          src='/images/avatar-circle.png'
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

function AboutMe() {
  return (
    <section id="about" className="w-full h-screen">
      <h1 className="text-4xl text-center mb-4">About Me</h1>

      <Card className="mb-4">
        <p>
          My name is Chad Adams. I'm a Full-Stack Developer from Mandan, North
          Dakota. I develop all types of software, but I primarily work with
          websites and mobile apps. Coding is my passion. I enjoy writing
          software that helps makes our lives easier. I first started to code
          around 12 years old when a friend of mine introduced me to RuneScape
          private servers.
        </p>
        <br />

        <p>
          I have an associates degree in Computer Programming from St Cloud
          Technical and Community College. I am currently pursuing a bachelors
          in Information Systems from Arizona State University.
        </p>
        <br />

        <p>
          I’m a big advocate for open-source software. I love Linux, my favorite
          linux distrobution is Ubuntu. I love reading books, writing blogs,
          working on my startup business, spending time with family and learning
          new technologies.
        </p>
        <br />
      </Card>

      <Certifications />
    </section>
  );
}

function Certifications() {

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
          <div className="flex items-center justify-center">
            <img src='/images/mta-badge-1.png' alt="mta-badge-1" style={{ maxWidth: '192px' }} />
          </div>
        </Card>

        <Card
          className="inline-block"
          onClick={() =>
            onClickCertification(
              'https://www.microsoft.com/en-us/learning/exam-98-388.aspx'
            )
          }
        >
          <div className="flex items-center justify-center">
            <img src='/images/mta-badge-2.png' alt="mta-badge-2" style={{ maxWidth: '192px' }} />
          </div>
        </Card>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Layout>
      <Intro />
      <AboutMe />
    </Layout>
  )
}
