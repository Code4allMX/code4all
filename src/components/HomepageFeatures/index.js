import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Web Development',
    Svg: require('@site/static/img/web-development.svg').default,
    description: (
      <>
        Any webpage or website you dream.
      </>
    ),
  },
  {
    title: 'Team Management',
    Svg: require('@site/static/img/team-management.svg').default,
    description: (
      <>
        Do you feel your team does not have clarity?
      </>
    ),
  },
  {
    title: 'Third Party Integration',
    Svg: require('@site/static/img/third-party-integration.svg').default,
    description: (
      <>
        Integrate your website with the tools you desire.
      </>
    ),
  },
  {
    title: 'Second Opinion',
    Svg: require('@site/static/img/second-opinion.svg').default,
    description: (
      <>
        Are you sure you will get what you pay for?
      </>
    ),
  },
  {
    title: 'Human Resource',
    Svg: require('@site/static/img/human-resources.svg').default,
    description: (
      <>
        Get a developer and pay as you go.
      </>
    ),
  }
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={`row ${styles.justifyContent}`}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
