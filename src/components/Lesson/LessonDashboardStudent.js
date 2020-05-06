import React, { useContext, useState, useEffect, useRef } from 'react'
import { UserContext } from '../../context/UserContext'

import { useStateWithName } from '../Hooks/useStateWithName'
import { Heading, MediumSpace, StyledContent, HtmlContent, StyledColumns } from '../../styles/PageStyles'
import Video from '../Guide/Video'
import AnnotateLyrics from '../Lyric/AnnotateLyrics'
import Loader from '../Loader'
import styled from 'styled-components'
import AnnotationForm from '../Annotation/AnnotationForm'
import { Message } from '../ui/Message'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_ANNOTATION, UPDATE_ANNOTATION } from '../../queries/annotations'

const LessonDashboardStudent = ({ lesson, refetch }) => {

  /* Refs */
  const ref = useRef();

  /* Context */
  const { user } = useContext(UserContext)

  /* State */
  const [lyrics, setLyrics] = useState(null);
  const [annotation, setAnnotation] = useState(null);
  const [note, setNote] = useState(null);
  const [item, setItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [hidden, setHidden] = useState(true);
  const [top, setTop] = useState(120);
  const [offset, setOffset] = useState(120);
  const [selectedLyrics, setSelectedLyrics] = useStateWithName([], "SelectedLyrics");
  const [assignedLyrics, setAssignedLyrics] = useStateWithName([], "AssignedLyrics");

  /* Queries */
  const [createAnnotation] = useMutation(CREATE_ANNOTATION)
  const [updateAnnotation] = useMutation(UPDATE_ANNOTATION)

  function handleSaveAnnotation(annotationToSave, isSubmitted) {
    setIsSaving(true)
    if (!annotationToSave.id) {
      createAnnotation({
        variables: {
          isSubmitted: isSubmitted,
          account: user.id,
          lesson: annotationToSave.lesson.id,
          lyrics: annotationToSave.lyrics,
          annotation: annotationToSave.annotation
        }
      }).then((response) => {
        refetch()
        combineLyrics();
        setMessage({
          type: "success",
          title: "Annotation Saved!",
          text: "Your annotation has been saved"
        })
        setAnnotation(response.data.createAnnotation)
        setIsSaving(false)
      })
    } else {
      updateAnnotation({
        variables: {
          id: annotationToSave.id,
          isSubmitted: isSubmitted,
          annotation: annotationToSave.annotation,
          lyrics: annotationToSave.lyrics
        }
      }).then((response) => {
        refetch()
        combineLyrics();
        setMessage({
          type: "success",
          title: "Annotation Submitted!",
          text: `Your annotation has been ${isSubmitted ? "submitted" : "saved"}`
        })
        setAnnotation(response.data.updateAnnotation)
        setIsSaving(false)
      })
    }
  }

  /* NOTE - When viewing the annotation I can now simple update selectedLyrics with
  any lyrics that are associated with the specific annotation */
  async function handleLyricClick(lyric, lyricsTop, lyricsHeight, arrowTop, maxY) {
    setNote(null);
    // Select or deselect the lyric
    if (!selectedLyrics.find(selectedLyric => selectedLyric.id === lyric.id)) {
      if (lyric.annotations && lyric.annotations.length > 0) {
        setSelectedLyrics(lyric.annotations[0].lyrics);
        setAnnotation(lyric.annotations[0])
      } else {
        setSelectedLyrics(prevState => [
          lyric,
          ...selectedLyrics
        ])
      }
    } else {
      if (lyric.annotations && lyric.annotations.length > 0) {
        setSelectedLyrics([]);
      } else {
        setSelectedLyrics(prevState => prevState.filter(selectedLyric => selectedLyric.id !== lyric.id))
      }
      return false; // We are only deselecting so no need to move the display
    }
    let contentHeight = ref.current.getBoundingClientRect().height;
    setTop(arrowTop);

    /*  If there annotation is shorter then the
        available space then center it */
    if (contentHeight / 2 < maxY && (arrowTop + contentHeight) < lyricsHeight) {
      let diff = (arrowTop - (contentHeight / 2))
      setOffset(diff > 0 ? diff + 10 : 0) // + 10px for half the height of the arrow
    } else if ((arrowTop + contentHeight) > lyricsHeight) {
      setOffset(lyricsHeight - contentHeight)
    } else {
      let newTop = arrowTop - maxY;
      setOffset(newTop > 0 ? newTop : 0)
    }
  }

  function handleShowNote(item, lyricsTop, lyricsHeight, arrowTop, maxY) {
    setHidden(false);
    let contentHeight = ref.current.getBoundingClientRect().height;
    setTop(arrowTop);

    /*  If there annotation is shorter then the
        available space then center it */
    if (contentHeight / 2 < maxY && (arrowTop + contentHeight) < lyricsHeight) {
      let diff = (arrowTop - (contentHeight / 2))
      setOffset(diff > 0 ? diff + 10 : 0) // + 10px for half the height of the arrow
    } else if ((arrowTop + contentHeight) > lyricsHeight) {
      setOffset(lyricsHeight - contentHeight)
    } else {
      let newTop = arrowTop - maxY;
      setOffset(newTop > 0 ? newTop : 0)
    }

    if (item.hasOwnProperty("annotation")) {
      setAnnotation(item);
      setNote(null);
      return
    }
    if (item.hasOwnProperty("note")) {
      setNote(item);
      setAnnotation(null);
      return
    }
    setItem(item)
  }

  function handleHide() {
    setHidden(true);
  }

  function combineLyrics() {
    /* Combine Guide Lyrics with Lesson Lyrics */
    var combinedLyrics = lesson.guide.lyrics.map(l1 => {
      return Object.assign({}, l1, lesson.lyrics.filter(l2 => l1.id === l2.id)[0])
    });

    // TODO handle this on the server side, for now just remove any annotations that
    // do not belong to the current user
    let removedAnnotationLyrics = combinedLyrics.map(lyric => {
      if (lyric.annotations) {
        return {
          ...lyric,
          annotations: lyric.annotations.filter(annotation => annotation.account.id === user.id)
        }
      } else {
        return lyric
      }
    })

    setAssignedLyrics(lesson.lyrics);
    setLyrics(removedAnnotationLyrics);
  }

  function sortLyrics(lyrics) {
    let sortedLyrics = lyrics.sort((a, b) => {
      return a.order > b.order ? 1 : b.order > a.order ? -1 : 0
    })
    return sortedLyrics
  }

  useEffect(() => {
    if (selectedLyrics.length) setHidden(false);
  }, [selectedLyrics])

  useEffect(() => {
    combineLyrics();
  }, [])

  if (!lyrics) return <Loader />
  return (
    <StyledContent>
      <Heading>
        <h1 style={{ textAlign: "center" }}>{lesson.lessonTitle}</h1>
      </Heading>

      <HtmlContent>
        <MediumSpace dangerouslySetInnerHTML={{ __html: lesson.lessonDescription }} />
      </HtmlContent>

      <Heading>
        <h1>{lesson.guide.videoTitle}</h1>
      </Heading>

      <Video guide={lesson.guide} />

      <StyledColumns>
        <AnnotateLyrics
          lyrics={lyrics}
          assignedLyrics={assignedLyrics}
          selectedLyrics={selectedLyrics}
          refetch={refetch}
          onClick={handleLyricClick}
          showNote={handleShowNote}
          hide={handleHide} />
        <StyledMovingColumn
          arrowTop={top}
          contentTop={offset}
          className={hidden ? "hidden" : ""}>
          <div className="arrow"></div>
          <div className="content" ref={ref}>
            {note && !annotation &&
              <div>
                <h6 style={{ margin: "1rem 0" }}>Lyrics</h6>
                <div className="lyrics">
                  {sortLyrics(note.lyrics).map(lyric => (
                    <em
                      key={lyric.id}
                      style={{ display: "block", marginBottom: ".5rem" }}
                    >
                      {lyric.lyric}
                    </em>
                  ))}
                </div>
                <h6 style={{ margin: "1rem 0" }}>Teacher Note</h6>
                <div dangerouslySetInnerHTML={{ __html: note.note }} />
              </div>
            }
            {annotation && (!selectedLyrics || selectedLyrics.length === 0) &&
              <div>
                {annotation.isSubmitted &&
                  <div>
                    <h6 style={{ margin: "1rem 0" }}>Lyrics</h6>
                    <div className="lyrics">
                      {sortLyrics(annotation.lyrics).map(lyric => (
                        <em
                          key={lyric.id}
                          style={{ display: "block", marginBottom: ".5rem" }}
                        >
                          {lyric.lyric}
                        </em>
                      ))}
                    </div>
                  </div>
                }
                <h6 style={{ margin: "1rem 0" }}>Annotation</h6>
                <div dangerouslySetInnerHTML={{ __html: annotation.annotation }} />
                {annotation.isSubmitted &&
                  <span className="primary">* SUBMITTED</span>
                }
                {!annotation.isSubmitted &&
                  <span className="primary">* click to edit</span>
                }
              </div>
            }
            {item &&
              <div dangerouslySetInnerHTML={{ __html: item }} />
            }
            {selectedLyrics && selectedLyrics.length > 0 &&
              <AnnotationForm
                lesson={lesson}
                annotation={annotation}
                selectedLyrics={selectedLyrics}
                isSaving={isSaving}
                setSelectedLyrics={setSelectedLyrics}
                saveAnnotation={handleSaveAnnotation}
                cancel={handleHide}
              />
            }
          </div>
        </StyledMovingColumn>
      </StyledColumns>
      {
        message &&
        <Message
          toast
          dismiss={() => setMessage(null)}
          type={message.type}
          title={message.title}>
          {message.text}
        </Message>
      }
    </StyledContent>
  )
}

export default LessonDashboardStudent

const StyledMovingColumn = styled.div`
  position: relative;
  opacity: 1;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .arrow {
    position: absolute;
    display: block;
    width: 2rem;
    height: 2rem;
    border-left: 3px solid #DD3333;
    border-top: 3px solid #DD3333;
    background-color: #FFFFFF;
    transform: rotate(-45deg);
    transition: all .3s ease;
    left: -0.9rem;
    z-index: 10;

    top: ${props => props.arrowTop}px;
  }

  .content {
    position: absolute;
    padding-left: 2rem;
    border-left: 3px solid #DD3333;
    transition: all .3s ease;
    z-index: 5;
    min-height: 7rem;
    top: ${props => props.contentTop}px;

    .lyrics {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid black;
    }
  }
`