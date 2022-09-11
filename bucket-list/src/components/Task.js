import React, { useState } from "react";
import styled from "styled-components/native";
import { images } from '../images';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import Input from './Input'

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({theme})=>theme.itemBackground};
  padding: 5px;
  margin: 3px 0;
`;

const Contents = styled.Text`
  flex:1;
  font-size: 24px;
  color: ${({completed, theme})=> completed ? theme.done : theme.text};
  text-decoration: ${({completed})=> completed ? 'line-through' : 'none'};
`;

const Task = ({task,deleteTask,toggleTask,updateTask})=>{
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);

  //항목 입력 완료시
  const _onSubmitEditing = () => {
    if(isEditing){
      const editedTask = {...task,text}; //text:수정된 텍스트
      updateTask(editedTask);
      setIsEditing(false);
    }
  }

  //수정 버튼 클릭 시
  const _handleUpdateButtonPress = () => {
    setIsEditing(true);
  }

  //수정 입력 항목 포커스를 떠났을 때
  const _onBlur = () => {
    if(isEditing){
      setIsEditing(false);
      setText(task.text);
    }
  }

  return isEditing ?
    (
      <Input
        value = {text}
        placeholder={'항목을 작성바랍니다.'} 
        onChangeText={text=>setText(text)}    //입력 필드가 수정될 때마다
        onSubmitEditing={_onSubmitEditing}    //입력 완료 시
        onBlur={_onBlur}
      />
    ) 
    : 
    (
    <Container>
      {/* 완료 버튼 */}
      <IconButton type={task.completed ? images.completed : images.uncompleted}
                  onPressOut={toggleTask}
                  id={task.id}  
                  completed={task.completed}
      />
      {/* 할 일 */}
      <Contents completed={task.completed}>{task.text}</Contents>

      {/* 수정 버튼 */}
      {/* 완료시 수정 버튼 */}
      {task.completed || <IconButton type={images.update} onPressOut={_handleUpdateButtonPress}/>}

      {/* 삭제버튼 */}
      <IconButton type={images.delete} 
                  onPressOut={deleteTask}
                  id={task.id}
                  completed={task.completed}
      />
    </Container>
  )
};

Task.propTypes = {
  task:PropTypes.object.isRequired,
  deleteTask:PropTypes.func.isRequired,
  toggleTask:PropTypes.func.isRequired
}

export default Task;