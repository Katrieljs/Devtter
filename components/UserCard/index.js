import Avatar from "../Avatar"

export default function UserCard({ avatar, username, email }) {
  return (
    <>
      <section>
        <Avatar src={avatar} alt={username} />
        <div>
          <h3>{username}</h3>
          <p>{email}</p>
        </div>
      </section>

      <style jsx>{`
        section {
          padding-bottom: 10px;
          display: flex;
          gap: 10px;
        }
        div {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  )
}
