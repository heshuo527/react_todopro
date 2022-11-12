import React, { useEffect, useState } from 'react';
import { Table, Button, Input, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getTime } from './types/time';
import './App.css';

interface DataType {
  key?: React.Key;
  id: Number;
  name: string;
  time: number;
  done: boolean;
}


const App: React.FC = () => {

  const columns: ColumnsType<DataType> = [
    {
      title: '事件',
      dataIndex: 'name',
      render: (_, todo) => {
        return (
          <div className={todo.done ? 'todo-done' : 'done'}>{todo.name}</div>
        )
      }
    },
    {
      title: '时间',
      dataIndex: 'age',
      render: (_, todo) => {
        return (
          <span>{getTime(todo.time)}</span>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'address',
      render: (_, todo) => {
        return (
          <>
            <Button onClick={() => switchDone(todo.id)} type='primary'>完成</Button>
            <Button onClick={() => deleteTodo(todo.id)} danger>删除</Button>
          </>
        )
      }
    }
  ];

  const [todoList, setTodoList] = useState<Array<DataType>>([]);
  const [inpValue, setInpValue] = useState('')

  const addTodo = () => {
    const setTime = new Date().getTime()
    if (inpValue === '') {
      message.warn('请输入内容')
      return
    }
    let todo = {
      key: setTime,
      id: setTime,
      name: inpValue,
      time: setTime,
      done: false,
    }
    setTodoList([...todoList, todo])
    saveTodo([...todoList, todo])
    message.success('添加成功')
  }

  const deleteTodo = (id: Number) => {
    const todo = [...todoList]
    const newTodo = todo.filter(todo => todo.id !== id)
    setTodoList([...newTodo])
    saveTodo([...newTodo])
    message.error('删除成功')
  }

  const switchDone = (id: Number) => {
    todoList.forEach(todo => {
      if (todo.id === id) {
        if (todo.done === false) {
          todo.done = true
          message.warn('已完成')
        } else {
          todo.done = false
        }
        return
      }
    })
    setTodoList([...todoList])
    saveTodo([...todoList])
  }

  const saveTodo = (arr: Array<DataType>) => {
    localStorage.todoList = JSON.stringify(arr)
  }

  const loadTodo = () => {
    // 要是第一次打开的话就让他增加一个 todoList 防止打不开
    const todoList = localStorage.getItem('todoList')
    if (todoList) {
      setTodoList(JSON.parse(todoList))
    }
  }

  useEffect(() => {
    loadTodo()
  }, [])

  return (
    <>
      <Input placeholder="请输入内容..." value={inpValue} onChange={(e) => setInpValue(e.target.value)} />
      <Button type='primary' onClick={() => addTodo()}>添加</Button>
      <Table columns={columns} dataSource={todoList} />
    </>
  );
}

export default App;
