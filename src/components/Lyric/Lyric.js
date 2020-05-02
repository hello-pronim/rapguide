import React, { useState } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Lyric = ({ lyric, selected = false, isSelectable = false, ...rest }) => {

  let isAssigned = lyric.annotations
  let isAnnotated = lyric.anotations && lyric.annotations.length
  let isSubmitted = false
  let isExample = false
  let hasNote = lyric.notes && lyric.notes.length ? true : false
  if (isAnnotated) {
    isSubmitted = lyric.annotations.find(annotation => annotation.isSubmitted)
  }
  if (hasNote) {
    isExample = lyric.notes.find(note => note.isExample)
  }

  /* Handle adding any necessary classes */
  let classes = []
  if (isAssigned) classes.push("assigned");
  if (isAnnotated) classes.push("annotated");
  if (isSubmitted) classes.push("submitted");
  if (isExample) classes.push("example");
  if (selected) classes.push("selected");
  if (hasNote) classes.push("noted");
  if (isSelectable || isAssigned || isAnnotated || isSubmitted || isExample) classes.push("selectable");

  return (
    <StyledLyric className={classes.length ? classes.join(" ") : ""} {...rest}>
      {lyric.lyric}
      {isExample &&
        <span><FontAwesomeIcon icon={faStar} /></span>
      }
    </StyledLyric>
  )
}

export default Lyric

const StyledLyric = styled.div`
  font-size: 1.8rem;
  line-height: 2.75rem;
  margin-bottom: 2px;
  padding: 0 .5rem;
  transition: background-color .3s ease;

  span {
    color: #CBD5E0;
    margin-left: 0.5rem;
    font-size: 1.4rem;
  }

  &.selectable {
    cursor: pointer;
  }

  &.assigned {
    background-color: #EDF2F7;

    &:hover {
      background-color: #E2E8F0;
    }
  }

  &.noted {
    background-color: #CBD5E0;

    &:hover,
    &.hovering {
      background-color: #FEFCBF;
    }
  }

  &.selected {
    background-color: #FEFCBF;

    &:hover {
      background-color: #FAF089;
    }

    span {
      color:  #FAF089;
    }
  }

  &.annotated {
    background-color: red;
  }

  &.submitted {
    background-color: yellow;
  }

  &.example {
    background-color: #BEE3F8;

    span {
      color: #90CDF4;
    }
  }

`