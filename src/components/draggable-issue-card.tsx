import dayjs from 'dayjs';
import { Draggable } from 'react-beautiful-dnd';
import { GithubIssue } from '../context/github/types';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface DraggableIssueCardProps {
  item: GithubIssue;
  index: any;
}

const DraggableIssueCard: React.FC<DraggableIssueCardProps> = ({
  item,
  index,
}) => {
  return (
    <Draggable draggableId={String(item.id)} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="card" style={{ marginBottom: 10, border: 'none' }}>
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">
                  #{item.number} opened {dayjs(item.created_at).fromNow()}{' '}
                  by&nbsp;
                  {item.user.login}
                </p>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableIssueCard;
