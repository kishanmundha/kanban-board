import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { GithubIssue } from '../context/github/types';
import { useKanbanBoard } from '../hooks/use-kanban-board';
import IssueCategory from './issue-category';

function removeFromList<T>(list: T[], index: number): [T, T[]] {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
}

const addToList = (list: any, index: any, element: any) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const columnLists = ['todo', 'inProgress', 'done'];

interface KanbanBoardProps {
  issues: GithubIssue[];
  url?: string;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = props => {
  const { elements, setElements } = useKanbanBoard(props.issues, props.url);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const listCopy: any = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
  };

  return (
    <div
      className="d-flex flex-fill overflow-hidden"
      style={{
        padding: 10,
      }}
    >
      <div
        className="d-flex flex-fill"
        style={{ backgroundColor: '#eee', padding: 20 }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <div
            className="flex-fill"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridGap: 20,
            }}
          >
            {columnLists.map(listKey => (
              <IssueCategory
                elements={(elements as any)[listKey] as any}
                key={listKey}
                categoryKey={listKey}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
