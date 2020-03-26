import additionalFeatures from './additional-features';
import bestPractices from './best-practices';
import clients from './clients';
import overview from './overview';
import releaseNotes from './release-notes';
import usage from './usage';

export default {
  editor: {
    // preview: false,
  },
  files: [
    overview,
    usage,
    clients,
    additionalFeatures,
    bestPractices,
    releaseNotes,
  ],
  label: 'minFraud',
  name: 'minfraud',
};

