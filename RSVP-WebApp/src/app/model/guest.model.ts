export interface Guest{
  email:any;
  guest:Invitee[]
}

export interface Invitee{
  firstName:string;
  lastName:string
}

export interface InviteeList{
  guest:Invitee[];
  email:string;
  id:string;
  dateRsvp?:string;
}
export interface InviteeList extends Array<InviteeList>{}
