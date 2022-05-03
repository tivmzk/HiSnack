// 사이드바 컴포넌트 -> 메뉴를 삽입
class Sidebar extends React.Component {
    render() {
        const { onSetCategory, onSetTitle, onItem } = this.props;
        return (
            <div>
                <Menu 
                    onSetCategory={onSetCategory}
                    onSetTitle={onSetTitle}
                    onItem={onItem}
                />
            </div>
        );
    }
}

//메뉴 컴포넌트
class Menu extends React.Component {
    render() {
        const { onSetCategory, onSetTitle, onItem } = this.props;
        return (
            <>
                <div>
                    <h4>MENU</h4>
                </div>
                <MenuList 
                    onSetCategory={onSetCategory}
                    onSetTitle={onSetTitle}
                    onItem={onItem}
                />
            </>

        );
    }
}

//메뉴의 자식 컴포넌트 -> 메뉴 목록 반환
class MenuList extends React.Component {
    render() {
        const { onSetCategory, onSetTitle, onItem } = this.props;
        return (
            <div >
                <ul>
                    <li onClick={ () => {onSetCategory("sub", "구독"); onSetTitle("구독 상품 내역"); }}>구독 관리</li>
                    <li onClick={ () => {onSetCategory("orders", "주문"); onSetTitle("주문 정보"); }}>주문 관리</li>
                    <li onClick={ () => {onSetCategory("member", "회원"); onSetTitle("회원 정보"); onItem(event, 'member');}}>회원 정보 수정</li>
                    <li onClick={ () => {onSetCategory("review", "리뷰"); onSetTitle("리뷰 정보"); }}>리뷰 관리</li>
                </ul>
            </div>
        );
    }
}