// 437. 리덕스로 HTTP State 및 피드백 처리
// 응답 및 잠재적 오류 처리하기 위해 알림 구성 요소 Component

import classes from './Notification.module.css';

const Notification = (props) => {
    let specialClasses = '';
    
    if (props.status === 'error') {
        specialClasses = classes.error;
    }
    
    if (props.status === 'success') {
        specialClasses = classes.success;
    }
    
    const cssClasses = `${classes.notification} ${specialClasses}`;
    
    return (
        <section className={cssClasses}>
        <h2>{props.title}</h2>
        <p>{props.message}</p>
        </section>
    );
};

export default Notification;