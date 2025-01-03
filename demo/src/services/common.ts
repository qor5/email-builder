import user from '@demo/store/user';
import { request } from './axios.config';
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dwkp0e1yo/image/upload';

export const common = {
  async uploadByQiniu(file: File | Blob): Promise<string> {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'easy-email-test');

    const res = await axios.post<{ url: string }>(CLOUDINARY_URL, data);
    return res.data.url;
  },
  uploadByUrl(url: string) {
    return request.get<string>('/upload/user/upload-by-url', {
      params: {
        url,
      },
    });
  },
  getMenu(): Promise<IAppMenuItem[]> {
    return Promise.resolve([
      {
        name: '数据模板',
        icon: 'bar-chart',
        isOpen: true,
        children: [
          {
            name: '数据模板',
            url: '/',
          },
        ],
      },
    ]);
  },

  saveEmailChanges(data: { subject: string; html: string; json: string }) {
    return request.post('http://localhost:9800/email_template/create', {
      subject: data.subject,
      json_body: data.json,
      html_body: data.html,
    });
  },

  async sendEmail(data: { id: string }) {
    return request.post('http://localhost:9800/email_template/send', {
      template_id: +data.id,
      user_ids: [1],
    });
  },
};

export interface IAppMenuItem {
  name: string;
  url?: string;
  icon: string;
  isOpen?: boolean;
  children: IAppSubMenuItem[];
}

export interface IAppSubMenuItem {
  name: string;
  url: string;
  isOpen?: boolean;
}
