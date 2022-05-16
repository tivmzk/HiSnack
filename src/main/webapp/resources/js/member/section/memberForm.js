// title 컴포넌트 -> 메뉴 별 title 표시
class MemberForm extends React.Component {
    render() {
        const { item, onUpdate, onMemberChange } = this.props;

        return (
            <div>
                <form id="memberForm">
                    <h1>회원 정보 수정</h1>
                    <div>
                        <label>이름</label>
                        <input name="name" value={item.name} onChange={onMemberChange} />
                    </div>
                    <div>
                        <label>주소</label>
                        <input name="address" value={item.address != null ? item.address : null} onChange={onMemberChange} />
                    </div>
                    <div>
                        <label>전화번호</label>
                        <input name="tel" value={item.tel != null ? item.tel : null} onChange={onMemberChange} />
                    </div>
                    <div>
                        <label>이메일</label>
                        <input name="email" value={item.email} onChange={onMemberChange} />
                    </div>
                    <button type="button" onClick={() => onUpdate("member")}>수정</button>
                </form>
            </div>
        );
    }
}