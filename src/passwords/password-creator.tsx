import React from "react";
import { PasswordGenerator, PasswordOptions, DefaultPasswordOptions } from '@wholesome/passwords';
import { TextField, Slider, Tooltip } from "@material-ui/core";
import styled from "styled-components";
import { PasswordAdvanced } from "./password-advanced";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faWrench } from '@fortawesome/free-solid-svg-icons'
import * as _ from 'lodash';
import { Link, withRouter } from "react-router-dom";

const PasswordCreatorWrap = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 2rem 0;

  .text {
    vertical-align: baseline;
    margin-right: 1rem;
    display: inline-block;
  }

  .label {
    input {
      vertical-align: baseline;
      padding: 3px 0;
    }
  }
`;

const StyledTextField = styled(TextField)`
  input {
    font-size: 1.5rem !important;
    text-align: center;
  }
`;

const PasswordComplexity = styled.div`
  padding: 1rem 0 0 0;
  display: flex;
  align-items: center;

  @media (max-width: 800px) {
    display: block;
  }
`;

const PasswordComplexityLabel = styled.div`
  flex: 0 0 100px;
  vertical-align: baseline;

  @media (max-width: 800px) {
    font-weight: bold;
    &:after {
      content: ":";
    }
  }
`;

const PasswordComplexityControl = styled.div`
  flex: 1;
  vertical-align: baseline;
  height: 25px;

  @media (max-width: 800px) {
    padding: .5rem 0;
  }
`;

const PasswordComplexityAdvanced = styled.div`
  flex: 0 0 70px;
  vertical-align: baseline;
  text-align: right;

  a {
    display: inline-block;
    margin-left: 15px;
  }
`;

export interface PasswordCreatorState {
  options: PasswordOptions;
  passwords: string[];
}

export interface URLProps {
  advanced: boolean;
  list: boolean;
  count: number;
  slider: number;
}

const DefaultUrlProps: URLProps = {
  advanced: false,
  list: false,
  count: 10,
  slider: 3
};

const SliderOptions = [
  {
    ...DefaultPasswordOptions,
    minLowercase: 0,
    minUppercase: 0,
    minNumber: 0,
    minSymbols: 0,
    length: 6,
    chunkSize: 2
  },
  {
    ...DefaultPasswordOptions,
    minLowercase: 1,
    minUppercase: 1,
    minNumber: 1,
    minSymbols: 0,
    length: 8,
    chunkSize: 2
  },
  {
    ...DefaultPasswordOptions,
    minLowercase: 1,
    minUppercase: 1,
    minNumber: 1,
    minSymbols: 1,
    length: 12,
    chunkSize: 3
  },
  {
    ...DefaultPasswordOptions,
    minLowercase: 1,
    minUppercase: 1,
    minNumber: 1,
    minSymbols: 1,
    length: 16,
    chunkSize: 4
  },
  {
    ...DefaultPasswordOptions,
    minLowercase: 1,
    minUppercase: 3,
    minNumber: 3,
    minSymbols: 3,
    length: 24,
    chunkSize: 0
  },
];

export class PasswordCreatorComponent extends React.Component<any, PasswordCreatorState> {
  public constructor(props: any) {
    super(props);
    const { count, list, slider } = this.getUrlProps();
    const options = SliderOptions[slider - 1];
    const passwords = this.generatePasswords(options, count, list);
    this.state = {
      options,
      passwords,
    };
  }

  public render() {
    const { passwords, options } = this.state;
    const { advanced, list, slider } = this.getUrlProps();

    const multipleLink = this.constructLink({ list: !list });
    const advancedLink = this.constructLink({ advanced: !advanced });

    return (
      <PasswordCreatorWrap>
        {_.map(passwords, password => <StyledTextField value={password} fullWidth onFocus={this.onFocus} margin='none' />)}
        <PasswordComplexity>
          <PasswordComplexityLabel>
            Complexity
          </PasswordComplexityLabel>
          <PasswordComplexityControl>
            {!advanced && <Slider
              aria-labelledby="Password complexity"
              step={1}
              marks
              min={0}
              max={4}
              value={slider - 1}
              onChange={this.onSliderChange}
            />}
          </PasswordComplexityControl>
          <PasswordComplexityAdvanced>
            <Tooltip title='Multiple passwords'>
              <Link to={multipleLink} onClick={this.onListClick}><FontAwesomeIcon icon={faList} /></Link>
            </Tooltip>
            <Tooltip title='Advanced'>
              <Link to={advancedLink}><FontAwesomeIcon icon={faWrench} /></Link>
            </Tooltip>
          </PasswordComplexityAdvanced>
        </PasswordComplexity>
        {advanced && <PasswordAdvanced
          options={options}
          onOptionTextChange={this.onOptionTextChange}
          onOptionCheckboxChange={this.onOptionCheckboxChange}
        />}
      </PasswordCreatorWrap>
    );
  }

  public onListClick = () => {
    const props = this.getUrlProps();
    this.setState({
      passwords: this.generatePasswords(
        SliderOptions[props.slider - 1],
        props.count,
        !props.list
      )
    });
  };

  public constructLink = (obj: any) => {
    const baseLink = '/passwords';
    const fragments = _.pickBy(_.defaults(obj, this.getUrlProps()), (v, k) => v !== (DefaultUrlProps as any)[k]);

    if (fragments.length === 0) {
      return baseLink;
    }

    const linkFragments = _.map(fragments, (v, k) => _.isBoolean(v) && v ? k : `${k}=${v}`);
    return `${baseLink}/${linkFragments.filter(v => v).join(';')}`;
  };

  public onOptionCheckboxChange = (field: any) =>{
    const checked = field[1] > 0;
    const options = {
      ...this.state.options,
      [field[0]]: checked ? 0 : (field[3])
    };
    this.setState({
      options,
      passwords: this.generatePasswords(options)
    });
  }

  public onOptionTextChange = (event: any, field: any) => {
    const options = {
      ...this.state.options,
      [field[0]]: event.target.value
    };
    this.setState({
      options,
      passwords: this.generatePasswords(options)
    });
  }

  private onFocus = (event: any) => {
    event.preventDefault();
    const { target } = event;
    target.focus();
    target.setSelectionRange(0, target.value.length);
  }

  private onSliderChange = (event: any, sliderRaw: any) => {
    const slider = sliderRaw + 1;
    if (slider !== this.getUrlProps().slider) {
      const options = SliderOptions[slider - 1];
      this.setState({
        options,
        passwords: this.generatePasswords(options)
      });
      this.setUrlProps({ slider });
    }
  }

  private generatePasswords(options = SliderOptions[this.getUrlProps().slider - 1], count = this.getUrlProps().count, list = this.getUrlProps().list): string[] {
    return _.times(list ? count : 1, () => PasswordGenerator.generate(options));
  }

  private setUrlProps = (props: Partial<URLProps>) => {
    this.props.history.push(this.constructLink(props));
  };

  private getUrlProps = () => {
    const urlPropsStr = _.get(this.props.location.pathname.split('/'), [2], '') as string;
    const urlProps = _.reduce(urlPropsStr.split(';'), (r, fragment) => {
      const bits = fragment.split('=');
      if (bits.length > 1) {
        return { ...r, [bits[0]]: bits[1] };
      }
      return { ...r, [bits[0]]: true };
    }, {});
    const produced = _.defaults(urlProps, DefaultUrlProps);
    return produced;
  }
}

export const PasswordCreator = withRouter(PasswordCreatorComponent as any) as any;
