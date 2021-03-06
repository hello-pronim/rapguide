import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  StyledContent,
  CenteredContent,
  Heading,
  FullSection,
  MediumSpace,
  StyledColumns,
} from "../../styles/PageStyles";
import { SocialShare } from "../SocialShare";
import { scrollToHashId } from "../../utilities/hash";

export const About = () => {
  function showNextDiv(e) {
    const el = e.currentTarget.parentNode.nextSibling;
    if (el.classList.contains("hidden")) {
      el.classList.remove("hidden");
      el.classList.add("shown");
    } else {
      el.classList.remove("shown");
      el.classList.add("hidden");
    }
  }

  useEffect(() => {
    scrollToHashId();
  }, []);

  return (
    <>
      <FullSection style={{ display: "flex", alignItems: "center" }}>
        <StyledContent>
          <StyledColumns>
            <MediumSpace style={{ fontSize: "18px" }}>
              <Heading>
                <h1>What's This About?</h1>
              </Heading>
              <p>
                Since 2009, Canadian hip-hop artist Baba Brinkman has been
                producing science-themed rap songs and videos and calling them
                “Rap Guides” to various topics, and teachers at the high school
                and college level have been showing these videos in class as a
                fun way to engage students. RapGuide.com was built as a platform
                to design and run classroom assignments around rap music videos,
                and to empower students and other artists to create their own
                Rap Guides to new topics.
              </p>
            </MediumSpace>
            <MediumSpace style={{ textAlign: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 209 233">
                <title>baba-rapguide-com</title>
                <g id="Layer_1" data-name="Layer 1">
                  <path d="M122.66,111.32C146.43,92.46,157,66,157.16,27H140.83c0,3-.1,5.89-.24,8.74H66.72C66.57,32.9,66.5,30,66.49,27H50.16c.12,36.22,9.27,61.63,29.61,80.18a155.23,155.23,0,0,1,17.4-11.07A72.29,72.29,0,0,1,81.31,81.29h44.81c-7,9-17.05,16.88-31.41,23.83-44.54,21.55-45.4,89.56-45.34,97.82H65.7q0-6.47.7-12.87H141c.42,4.27.64,8.57.64,12.87H158C158,195.36,157.25,137.43,122.66,111.32ZM69,54.29a103.19,103.19,0,0,1-1.8-11.44h72.83a100.86,100.86,0,0,1-1.78,11.44Zm7.45,19.89A65.05,65.05,0,0,1,70.9,61.4h65.55a64.9,64.9,0,0,1-5.63,12.78Zm23.89,50.94c1.13-.54,2.17-1.13,3.27-1.69,1.09.56,2.16,1.14,3.29,1.69a47.84,47.84,0,0,1,18.19,16H82.29A47.43,47.43,0,0,1,100.38,125.12ZM77.93,148.21h51.59a89.22,89.22,0,0,1,6.21,14.86h-64a89.15,89.15,0,0,1,6.19-14.86ZM140.14,183H67.25c.63-4.32,1.46-8.59,2.49-12.78h68C138.71,174.37,139.53,178.64,140.14,183Z" />
                </g>
              </svg>
            </MediumSpace>
          </StyledColumns>
        </StyledContent>
      </FullSection>
      <FullSection
        id="faq"
        bgColor="black"
        color="white"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <StyledContent>
          <StyledColumns>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 209 233">
                <title>baba-rapguide-com</title>
                <g id="Layer_1" data-name="Layer 1">
                  <path
                    fill="#FFFFFF"
                    d="M122.66,111.32C146.43,92.46,157,66,157.16,27H140.83c0,3-.1,5.89-.24,8.74H66.72C66.57,32.9,66.5,30,66.49,27H50.16c.12,36.22,9.27,61.63,29.61,80.18a155.23,155.23,0,0,1,17.4-11.07A72.29,72.29,0,0,1,81.31,81.29h44.81c-7,9-17.05,16.88-31.41,23.83-44.54,21.55-45.4,89.56-45.34,97.82H65.7q0-6.47.7-12.87H141c.42,4.27.64,8.57.64,12.87H158C158,195.36,157.25,137.43,122.66,111.32ZM69,54.29a103.19,103.19,0,0,1-1.8-11.44h72.83a100.86,100.86,0,0,1-1.78,11.44Zm7.45,19.89A65.05,65.05,0,0,1,70.9,61.4h65.55a64.9,64.9,0,0,1-5.63,12.78Zm23.89,50.94c1.13-.54,2.17-1.13,3.27-1.69,1.09.56,2.16,1.14,3.29,1.69a47.84,47.84,0,0,1,18.19,16H82.29A47.43,47.43,0,0,1,100.38,125.12ZM77.93,148.21h51.59a89.22,89.22,0,0,1,6.21,14.86h-64a89.15,89.15,0,0,1,6.19-14.86ZM140.14,183H67.25c.63-4.32,1.46-8.59,2.49-12.78h68C138.71,174.37,139.53,178.64,140.14,183Z"
                  />
                </g>
              </svg>
            </div>
            <MediumSpace className="faq">
              <Heading>
                <h1>FAQ</h1>
              </Heading>
              <p>
                <a className="showNextLink" onClick={showNextDiv}>
                  How did this all start?
                </a>
              </p>
              <div className="hidden">
                <p>
                  Canadian rapper Baba Brinkman was recruited by a British
                  geneticist, Mark Pallen, to write and perform a “Rap Guide to
                  Evolution” to help celebrate Charles Darwin’s 200th birthday
                  in 2009. Mark had asked to read Baba’s lyrics in advance to
                  check them for scientific accuracy and suggest revisions, and
                  at the premiere performance Mark joked that this would be the
                  world’s first-ever “peer reviewed rap”. Since then, Baba has
                  produced more than 100 science-themed rap songs and more than
                  40 music videos, which are used by teachers around the world
                  to introduce their students to science.
                </p>
                <SocialShare
                  url="https://www.rapguide.com/about#faq"
                  title="FAQ - How did this all start?"
                  mode="dark"
                />
              </div>

              <p>
                <a className="showNextLink" onClick={showNextDiv}>
                  What is a Rap Guide?
                </a>
              </p>
              <div className="hidden">
                <p>
                  A “Rap Guide” is a hip-hop song or music video (or live
                  performance) that both entertains and also serves as a roadmap
                  or guide to a larger body of knowledge, beyond the experience
                  of the artist. In practice, most of Baba Brinkman’s Rap Guides
                  have been about science, but some have also been about
                  politics, literature, philosophy, history, media, business,
                  environmentalism, and other subjects. Each Rap Guide explores
                  a topic that is at least partially external to the rapper, and
                  therefor verifiable using the tools of science and reason. All
                  rap songs are in some sense a “guide” to the subjective
                  thoughts and feelings and experiences of the rapper, but Rap
                  Guides also rely on secondary sources, which makes them
                  ideally-suited to educational use.
                </p>
                <SocialShare
                  url="https://www.rapguide.com/about#faq"
                  title="FAQ - What is a Rap Guide?"
                  mode="dark"
                />
              </div>

              <p>
                <a className="showNextLink" onClick={showNextDiv}>
                  What does RapGuide.com do?
                </a>
              </p>
              <div className="hidden">
                <p>
                  This site helps teachers to design private classroom
                  assignments using rap music videos, in which students annotate
                  the song lyrics with responses that explain the science and
                  subtext. These Lessons can ask for any kind of response from
                  the students, from personal reflections to literary
                  close-readings to explanations of the scientific content
                  citing sources. RapGuide.com also fields requests for new
                  topics to make Rap Guides about, publishes new Rap Guide
                  videos, and publishes the best student annotations. The
                  Lessons page also includes a step-by-step “How to Make a Rap
                  Guide” workshop for students to learn to write and produce
                  their own Rap Guides.
                </p>
                <SocialShare
                  url="https://www.rapguide.com/about#faq"
                  title="FAQ - What does RapGuide.com do?"
                  mode="dark"
                />
              </div>

              <p>
                <a className="showNextLink" onClick={showNextDiv}>
                  How do Lessons work?
                </a>
              </p>
              <div className="hidden">
                <p>
                  Teachers with an Educator Account can design Lessons and share
                  them with their students via private access codes. Students
                  watch the assigned video and write their responses into the
                  Lesson, with annotations attached to selected lyrics. Once
                  submitted, the teacher receives these student annotations via
                  their Lesson Dashboard. Students can also “peer review” each
                  other by upvoting and commenting on each others’ annotations,
                  and teachers can assess and grade student responses (if the
                  assignment is for course credit). Based on the recommendations
                  of teachers, and with the consent of students, the best
                  annotations are then displayed publicly on RapGuide.com for
                  anyone to explore and enjoy, revealing the subtext of each
                  song.
                </p>
                <SocialShare
                  url="https://www.rapguide.com/about#faq"
                  title="FAQ - How do Lessons work?"
                  mode="dark"
                />
              </div>

              <p>
                <a className="showNextLink" onClick={showNextDiv}>
                  I’m a student, how do I find my Lesson?
                </a>
              </p>
              <div className="hidden">
                <p>
                  If you’re a student enrolled in a Lesson, login to
                  RapGuide.com and enter the access code sent to you by your
                  teacher using the code field at the top of the Lessons page,
                  and your assignment should appear.
                </p>
                <SocialShare
                  url="https://www.rapguide.com/about#faq"
                  title="FAQ - I’m a student, how do I find my Lesson?"
                  mode="dark"
                />
              </div>

              <p>
                <a className="showNextLink" onClick={showNextDiv}>
                  I’m a teacher, how do I make a Lesson?
                </a>
              </p>
              <div className="hidden">
                <p>
                  Contact us to request an Educator Account and you will see the
                  “Create a Lesson” button next to each video. You can either
                  write your assignment from scratch or adapt one of the
                  existing lesson templates shared by other teachers. Once
                  you’ve selected which lyrics to assign as annotatable, written
                  your instructions and an example annotation, and set the
                  deadline and the number of annotations, upvotes, and comments
                  required per student to complete the assignment, you will see
                  the Lesson appear in your Dashboard and a code generator to
                  share it with students.
                </p>
                <SocialShare
                  url="https://www.rapguide.com/about#faq"
                  title="FAQ - I’m a teacher, how do I make a Lesson?"
                  mode="dark"
                />
              </div>
            </MediumSpace>
          </StyledColumns>
        </StyledContent>
      </FullSection>
      <FullSection id="faq-2" style={{ display: "flex", alignItems: "center" }}>
        <StyledContent>
          <StyledColumns>
            <MediumSpace className="faq">
              <p>
                <a className="showNextLink" onClick={showNextDiv}>
                  Why can’t I see my annotations publicly?
                </a>
              </p>
              <div className="hidden">
                <p>
                  We are assessing annotations in consultation with expert
                  consultants and publishing them as fast as we can, so please
                  stay tuned. Not all annotations generated by Lessons will be
                  published, but if your annotation is selected for display you
                  will receive a notification and a link to share it on social
                  media.
                </p>
                <SocialShare
                  url="https://www.rapguide.com/about#faq-2"
                  title="FAQ - Why can’t I see my annotations publicly?"
                />
              </div>

              <p>
                <a className="showNextLink" onClick={showNextDiv}>
                  Can the public annotate the lyrics if they want to?
                </a>
              </p>
              <div className="hidden">
                <p>
                  We might add public annotations at some point in the future,
                  but for now annotations must be generated by students in a
                  Lesson, or by invited educators or experts.
                </p>
                <SocialShare
                  url="https://www.rapguide.com/about#faq-2"
                  title="FAQ - Can the public annotate the lyrics if they want to?"
                />
              </div>

              <p>
                <a className="showNextLink" onClick={showNextDiv}>
                  How much does this cost?
                </a>
              </p>
              <div className="hidden">
                <p>
                  This site is in beta mode and currently free. It will always
                  be free for students and the public, and many of the functions
                  will remain free for most teachers. At some point in the
                  future we will probably add a subscription service for
                  educators to unlock premium features of the site.
                </p>
                <SocialShare
                  url="https://www.rapguide.com/about#faq-2"
                  title="FAQ - How much does this cost?"
                />
              </div>

              <p>
                <a className="showNextLink" onClick={showNextDiv}>
                  What does the Request Page do?
                </a>
              </p>
              <div className="hidden">
                <p>
                  If you have a topic you wish someone would make a Rap Guide
                  about, enter it into the Request page along with a description
                  of what it would look like and why it’s needed, and suggest
                  some further reading materials, and we will try to make it
                  happen. Approved Requests can be shared and commented on to
                  gauge public interest, and also serve as inspiration for
                  students looking for topics to explore in their workshops.
                </p>
                <SocialShare
                  url="https://www.rapguide.com/about#faq-2"
                  title="FAQ - What does the Request Page do?"
                />
              </div>

              <p>
                <a className="showNextLink" onClick={showNextDiv}>
                  Who pays for Rap Guides to get made?
                </a>
              </p>
              <div className="hidden">
                <p>
                  Most of Baba Brinkman’s songs and videos were either paid for
                  by crowdfunding, including Kickstarter, IndieGogo, and
                  Patreon, or commissioned and paid for by sponsors eager to
                  speed up the process of getting a Rap Guide to a certain topic
                  made. If topics submitted via the Request page gain a lot of
                  public interest (and don’t attract a sponsor), we may add a
                  crowdfunding function at some point to help cover production
                  costs.
                </p>
                <SocialShare
                  url="https://www.rapguide.com/about#faq-2"
                  title="FAQ - Who pays for Rap Guides to get made?"
                />
              </div>

              <p>
                <a className="showNextLink" onClick={showNextDiv}>
                  Who makes Rap Guide videos?
                </a>
              </p>
              <div className="hidden">
                <p>
                  Baba Brinkman (with help from Mark Pallen) coined the phrase
                  and has made the most content under the “Rap Guide” banner,
                  but lots of other artists make songs and videos with
                  informative content (
                  <Link to="/playlist/rap-guide-mixtape">
                    you can see a few examples here
                  </Link>
                  ), and this site is set up so that any video by any artist can
                  be added (with the artist’s permission). Teachers, if you know
                  of a music video made by someone other than Baba Brinkman that
                  you’d like to use for a class assignment, please contact us
                  and we’ll try to get permission to add it.
                </p>
                <SocialShare
                  url="https://www.rapguide.com/about#faq-2"
                  title="FAQ - Who makes Rap Guide videos?"
                />
              </div>

              <p>
                <a className="showNextLink" onClick={showNextDiv}>
                  Is this entertainment, or educational?
                </a>
              </p>
              <div className="hidden">
                <p>
                  Rap Guides are entertainment first and foremost, and
                  educational secondarily. Hip-hop has been aware of its role as
                  an information channel since its early days (witness KRS-One’s
                  album Edutainment), and has always wrestled with the balance
                  between popular and thought-provoking content, dance music and
                  commentary, Flavor Flav and Chuck D. From a practical
                  perspective, when artists try to educate but fail to connect,
                  they fail at both. Our philosophy was shaped by the “Move the
                  Crowd” ethic of Rakim, by way of the Chaucerian precept:
                  “whereas thou mayst have no audience, enforce thee not to
                  speak” through Talib Kweli’s observation: “I speak in schools
                  a lot because they say that I’m intelligent / No, it’s ‘cause
                  I’m dope. If I was wack, I’d be irrelevant.” Information that
                  fails to infiltrate the human psyche fails to be absorbed. Rap
                  Guides seek to deliver information through language arts,
                  emotion, music, and storytelling, without subserving the art
                  to the information.
                </p>
                <SocialShare
                  url="https://www.rapguide.com/about#faq-2"
                  title="FAQ - Is this entertainment, or educational?"
                />
              </div>

              <p>
                <a className="showNextLink" onClick={showNextDiv}>
                  Is every lyric of a Rap Guide entirely factual?
                </a>
              </p>
              <div className="hidden">
                <p>
                  Rap Guides point towards facts, at least to the best of our
                  collective ability to ascertain them (ie via the scientific
                  method). However, as art and poetry, a rap song will always
                  incorporate poetic license and the perspective of the artist.
                  The guiding ethic is: “plausible charitable interpretation”.
                  If a plausible charitable interpretation of the lyrics points
                  towards true information, then it succeeds, even if other
                  possible interpretations might lead to falsehoods. In
                  practice, most Rap Guides are made with input from experts to
                  help the artist avoid misinformation (hence “peer reviewed
                  rap”). However, sometimes discovering the falsehoods implied
                  by ambiguities in song lyrics can reveal the richest vein of
                  educational value.
                </p>
                <SocialShare
                  url="https://www.rapguide.com/about#faq-2"
                  title="FAQ - Is every lyric of a Rap Guide entirely factual?"
                />
              </div>

              <p>
                <a className="showNextLink" onClick={showNextDiv}>
                  Who are these Rap Guides for?
                </a>
              </p>
              <div className="hidden">
                <p>
                  The public! RapGuide.com showcases videos that are made for
                  general entertainment, and which also happen to contain useful
                  content for teachers. Feel free to browse and enjoy videos on
                  this site, and at any point if you want to take a deep dive
                  into the science, go ahead and read the annotations and follow
                  their source links.
                </p>
                <SocialShare
                  url="https://www.rapguide.com/about#faq-2"
                  title="FAQ - Who are these Rap Guides for?"
                />
              </div>
            </MediumSpace>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 209 233">
                <title>baba-rapguide-com</title>
                <g id="Layer_1" data-name="Layer 1">
                  <path
                    fill="#000000"
                    d="M122.66,111.32C146.43,92.46,157,66,157.16,27H140.83c0,3-.1,5.89-.24,8.74H66.72C66.57,32.9,66.5,30,66.49,27H50.16c.12,36.22,9.27,61.63,29.61,80.18a155.23,155.23,0,0,1,17.4-11.07A72.29,72.29,0,0,1,81.31,81.29h44.81c-7,9-17.05,16.88-31.41,23.83-44.54,21.55-45.4,89.56-45.34,97.82H65.7q0-6.47.7-12.87H141c.42,4.27.64,8.57.64,12.87H158C158,195.36,157.25,137.43,122.66,111.32ZM69,54.29a103.19,103.19,0,0,1-1.8-11.44h72.83a100.86,100.86,0,0,1-1.78,11.44Zm7.45,19.89A65.05,65.05,0,0,1,70.9,61.4h65.55a64.9,64.9,0,0,1-5.63,12.78Zm23.89,50.94c1.13-.54,2.17-1.13,3.27-1.69,1.09.56,2.16,1.14,3.29,1.69a47.84,47.84,0,0,1,18.19,16H82.29A47.43,47.43,0,0,1,100.38,125.12ZM77.93,148.21h51.59a89.22,89.22,0,0,1,6.21,14.86h-64a89.15,89.15,0,0,1,6.19-14.86ZM140.14,183H67.25c.63-4.32,1.46-8.59,2.49-12.78h68C138.71,174.37,139.53,178.64,140.14,183Z"
                  />
                </g>
              </svg>
            </div>
          </StyledColumns>
        </StyledContent>
      </FullSection>
      <FullSection
        id="faq"
        bgColor="black"
        color="white"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <StyledContent>
          <StyledColumns>
            <CenteredContent>
              <img
                src={require("../../images/logo-standard.jpg")}
                width="100%"
                style={{ paddingRight: "5rem" }}
              />
            </CenteredContent>
            <MediumSpace className="faq">
              <Heading>
                <h1>RAP GUIDE MEDIA</h1>
              </Heading>
              <p>
                Rap Guide Media is an education technology and media production
                company founded by pioneering rapper and science communicator
                Baba Brinkman. The company produces original songs, albums,
                music videos, and live performances, including concerts, variety
                shows, comedy shows, and award-winning off-Broadway plays. Rap
                Guide Media produced Baba Brinkman’s five-show residency at the
                historic Soho Playhouse in New York in 2019, and in 2020 we
                launched the video-based education platform RapGuide.com and the
                event services company EventRap.com.
              </p>
            </MediumSpace>
          </StyledColumns>
        </StyledContent>
      </FullSection>
    </>
  );
};

export default About;
