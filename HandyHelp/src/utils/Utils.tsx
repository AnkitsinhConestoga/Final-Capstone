import moment from "moment";

export const postalPattern = /^[abceghj-nprstvxy][0-9][abceghj-nprstv-z][0-9][abceghj-nprstv-z][0-9]$/;
export const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const Status = {
    Pending: 'Pending',
    InProgress: 'InProgress',
    Completed: 'Completed',
    Published: 'Published',
    Approved:'Approved',
    Canceled:'Cancelled'
  };

  export function formatCustomDate(dateString: string) {
    const date = moment(dateString);
    const now = moment();
  
    if (date.isSame(now, 'day')) {
      // Today
      return `Today at ${date.format('h:mm a')}`;
    } else if (date.isSame(now.clone().add(1, 'day'), 'day')) {
      // Tomorrow
      return `Tomorrow at ${date.format('h:mm a')}`;
    } else {
      // Another day
      return `${date.format('Do MMM')} at ${date.format('h:mm a')}`;
    }
  }

  export function generateChatId(userId:string, user2Id:string,postId:string) {
    const sortedIds = [userId, user2Id].sort();
    const chatId = `${sortedIds[0]}_${postId}_${sortedIds[1]}`;
    return chatId;
  }