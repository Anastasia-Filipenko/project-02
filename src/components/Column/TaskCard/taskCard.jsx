export default function TaskCard({ cardInfo }) {
  return (
    <li>
      <div>
        <div>
          <p>{cardInfo.title}</p>
          <p>{cardInfo.description}</p>
        </div>
        <div>
          <div>
            <div>
              <p>Priority</p>
              <p>{cardInfo.prority}</p>
            </div>
            <div>
              <p>Deadline</p>
              <p>{cardInfo.deadline}</p>
            </div>
          </div>
          {/* <div>PLACE FOR BUTTONS</div> */}
        </div>
      </div>
    </li>
  );
}
