import React, { Component } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import InfiniteScroll from 'react-infinite-scroller';
import '../../../../res/css/common.css'
const  toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction
  ['image'],

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

export default class Marked extends React.Component {
    constructor(props) {
      super(props)
  
      this.handleChange = this.handleChange.bind(this)
    }
  
    handleChange(value) {
      if(this.props.textChange)
      this.props.textChange(value)
    }
   
    
    render() {
      let className=this.props.readOnly?'hide':''
      let height=this.props.height||window.innerHeight*3/5
      let toolbarOption=this.props.toolbarOptions||toolbarOptions
      return (
        <ReactQuill className={className} value={this.props.text||''} readOnly={this.props.readOnly||false} modules={{toolbar:this.props.readOnly?[]: toolbarOption}}
                    onChange={this.handleChange} InfiniteScroll={InfiniteScroll} style={{height:height,...this.props.style}}/>
      )
    }
  }