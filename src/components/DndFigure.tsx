import {dragStarted, ItemType} from "../redux/DnDReducer";
import {useDispatch} from "react-redux";
import style from "../App.module.css";
import React from "react";

type DndFigurePropsType = {
    figureStyle: {}
    item: ItemType
}

export const DndFigure = (props: DndFigurePropsType) => {

    const dispatch = useDispatch()

    const startDraggingHandler = () => {
        dispatch(dragStarted(props.item.id, props.item.class))
    }

    return (
        <div draggable className={style.figures}>
            <div draggable style={props.figureStyle} onDragStart={startDraggingHandler}>
            </div>
        </div>
    )
}
