import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateSort } from '../../../services/sort/actions';
import Selectbox from '../../Selectbox';

const sortBy = [
  { value: 1, label: 'DNI' },
  { value: 2, label: 'PASAPORTE' }
];

const Sort2 = ({ updateSort, sort }) => (
  <div className="sort">
    <label className="lname">Documento:  
    <Selectbox options={sortBy} handleOnChange={value => updateSort(value)} /></label>
  </div>
);

Sort2.propTypes = {
  updateSort: PropTypes.func.isRequired,
  sort2: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  sort:state.sort.type
});

export default connect(
  mapStateToProps,
  { updateSort }
)(Sort2);
