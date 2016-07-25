import React from 'react'

export function swapArrayElements(items, indexFrom, indexTo) {
  var item = items[indexTo];
  items[indexTo] = items[indexFrom];
  items[indexFrom] = item;
  return items;
}

export function isMouseBeyond(mousePos, elementPos, elementSize) { //TODO refactor for UP
  var breakPoint = elementSize / 2; //break point is set to the middle line of element
  var mouseOverlap = mousePos - elementPos;
  return mouseOverlap > breakPoint;
}

export function SortableComposition(Component) {

  var elementEdge = 0;
  var updateEdge = true;

  return React.createClass({

    proptypes: {
      items: React.PropTypes.array.isRequired,
      updateState: React.PropTypes.func.isRequired,
      sortId: React.PropTypes.number,
      outline: React.PropTypes.string.isRequired, // row | column
      draggingIndex: React.PropTypes.number
    },

    getInitialState() {
      return {
        draggingIndex : null,
        dragging: false
      }
    },

    componentWillReceiveProps(nextProps) {
      this.setState({
        draggingIndex: nextProps.draggingIndex
      });
    },

    sortEnd() {
      this.props.updateState({
        draggingIndex: null
      });
    },

    sortStart(e) {
      const draggingIndex = e.currentTarget.dataset.id;
      this.props.updateState({
        draggingIndex: draggingIndex,
        draggingType: this.props.type
      });
      this.setState({
        draggingIndex: draggingIndex,
        draggingType: this.props.type,
        dragging: true
      });
      if (e.dataTransfer !== undefined) {
        e.dataTransfer.setData('data', e.target.innerHTML);
      }
      updateEdge = true;
    },

    dragOver(e) {
      e.preventDefault();
      var mouseBeyond;
      var positionX, positionY;
      var height, topOffset;
      var items = this.props.items;
      const overEl = e.currentTarget; //underlying element //TODO: not working for touch
      const indexDragged = Number(overEl.dataset.id); //index of underlying element in the set DOM elements
      const indexFrom = Number(this.state.draggingIndex);

      height = overEl.getBoundingClientRect().height;

      if(e.type === "dragover"){
        positionX = e.clientX;
        positionY = e.clientY;
        topOffset = overEl.offsetTop - overEl.scrollTop + overEl.clientTop
      }

      if (e.type === "touchmove") {
        positionX = e.touches[0].pageX;
        positionY = e.touches[0].pageY;
        if(updateEdge){
          elementEdge = e.currentTarget.getBoundingClientRect().top;
          updateEdge = false;
        }
        e.currentTarget.style.top = (positionY - elementEdge) + "px";
        topOffset = elementEdge;
      }

      if (this.props.outline === "list") {
        mouseBeyond = isMouseBeyond(positionY, topOffset, height)
      }

      if (this.props.outline === "column") {
        mouseBeyond = isMouseBeyond(positionX, overEl.getBoundingClientRect().left, overEl.getBoundingClientRect().width)
      }


      if(indexDragged !== indexFrom && mouseBeyond){
        if (!(this.state.draggingType && this.props.type !== this.state.draggingType)) {
          items  = items.length > 1 ? swapArrayElements(items, indexFrom, indexDragged) : items;
          this.props.updateState({
            items: items, draggingIndex: indexDragged
          });
        }
      }

    },

    isDragging() {
      return this.props.draggingIndex == this.props.sortId;
    },

    onDrop: function (event) {
      event.preventDefault();
      this.props.updateState({
        draggingIndex: null
      });

      const dataType = event.target.getAttribute('data-type');
      const data = event.dataTransfer.getData("data");

      if (this.props.draggingType && dataType !== this.props.draggingType && data) {
        this.props.updateState({
          draggingType: dataType
        });

        this.props.onDrop({
          changedItem: data,
          preType: this.props.draggingType,
          currType: dataType
        })
      }
    },

    render() {
      var draggingClassName = Component.displayName + "-dragging"
      return (
        <Component className={(this.isDragging()) ? draggingClassName : ""}
                   draggable={true}
                   onDragOver={this.dragOver}
                   onDrop={this.onDrop}
                   onDragStart={this.sortStart}
                   onDragEnd={this.sortEnd}
                   onTouchStart={this.sortStart}
                   onTouchMove={this.dragOver}
                   onTouchEnd={this.sortEnd}
                   children={this.props.children}
                   draggingType={this.props.draggingType}
                   data-type={this.props.type}
                   data-id={this.props.sortId}/>
      )
    }

  })
}

