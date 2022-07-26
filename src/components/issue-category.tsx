import { Droppable } from 'react-beautiful-dnd';
import { GithubIssue } from '../context/github/types';
import DraggableIssueCard from './draggable-issue-card';

interface DraggableElementProps {
  categoryKey: string;
  elements: GithubIssue[];
}

const IssueCategory: React.FC<DraggableElementProps> = ({
  categoryKey,
  elements,
}) => (
  <div className="d-flex flex-column flex-fill overflow-hidden">
    <h4 style={{ marginBottom: 20, textTransform: 'uppercase' }}>
      {categoryKey}
    </h4>
    <Droppable droppableId={categoryKey}>
      {provided => (
        <div
          className="flex-fill overflow-auto"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {elements.map((item: any, index: any) => (
            <DraggableIssueCard key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default IssueCategory;
