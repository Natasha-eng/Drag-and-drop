import {changeCanvasStatus, changeCopyStatus, ItemType} from "../redux/DnDReducer";
import {useDispatch} from "react-redux";
import React, {DragEvent, useState} from "react";
import style from "../App.module.css";
import {DndFigure} from "./DndFigure";

type FieldPropsType = {
    title: string
    items: Array<ItemType>
}

export const Field = React.memo(({title, items}: FieldPropsType) => {
    const dispatch = useDispatch()

    const OnEndDraggingFigure = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        dispatch(changeCanvasStatus())
    }

    const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const changeCopyStatusHandler = () => {
        dispatch(changeCopyStatus(true))
    }

    return (
        <div className={style.field} onDrop={OnEndDraggingFigure} onDragOver={onDragOverHandler} onDragStart = {changeCopyStatusHandler}>
            <h1 className={style.fieldTitle}>{title}</h1>
            {items.map(i => <DndFigure figureStyle={i.class} item={i}/>)}
        </div>
    )
})

